---
title: "docker dns http-proxy"
date: "2023-09-18 03:38:01"
post_modified: "2023-09-18 03:38:01"
description: "hostsファイルを書き換えずに localhost に向ける"
categories: ["Environment"]
tags: ["Docker", "開発環境"]
draft: false
---

## hostsファイルを書き換えずに localhost に向ける

開発条件によってはhostsファイルを書き換えて開発しなければいけないことがある。

### hostsファイルを書き換えるデメリット

- PCすべてが `hostsファイルの影響を受ける`
- local, remote と向き先を切り替えるのに毎回 `hosts` を書き換えるのはめんどくさい
- 上記からミスも発生する可能性あり。(localを見ているつもりがremoteをみていた)

### nginx-proxy coredns http-proxy(apache) nginx で環境を構築

- 開発用のブラウザを用意して dns 設定を `nginx-proxy` のリバースプロキシで443 を corednsへ向ける https://localhost/dns-query
- IntellijIdeaなどの httpクライアントで http-proxy を設定することにより localhost へ向ける localhost:8888

***http-proxy を通した場合は proxyサーバーの DNSが優先される。`/etc/resole.conf` で `coredns` を参照させる。***

#### docker-compose.yml

```yaml
version: "3"
services:
  coredns:
    build: ./coredns
    container_name: ${COMPOSE_PROJECT_NAME}_coredns
    #    profiles: ["debug"]
    restart: on-failure
    expose:
      - '53'
      - '53/udp'
      - '443'
      - '443/udp'
    volumes:
      - ./coredns/config:/etc/coredns
      - ./certs:/certs
    ports:
      - "53:53"
      - "53:53/udp"
    networks:
      nginx-proxy:
        ipv4_address: 172.30.0.100

  nginx-proxy:
    build: ./nginx-proxy
    container_name: ${COMPOSE_PROJECT_NAME}_${PROXY_CONTAINER_NAME}
    ports:
      - ${HOST_HTTP_PORT}:${CONTAINER_HTTP_PORT}
      - ${HOST_HTTPS_PORT}:${CONTAINER_HTTPS_PORT}
    volumes:
      - ./nginx-proxy/conf.d/timeout.conf:/etc/nginx/conf.d/timeout.conf
      - ./nginx-proxy/conf.d/dns.conf:/etc/nginx/conf.d/dns.conf
      - ./nginx-proxy/conf.d/dns-test.conf:/etc/nginx/conf.d/dns-test.conf
      - ./nginx-proxy/html/nginx-proxy.html:/usr/share/nginx/html/nginx-proxy.html
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs:ro
    logging:
      options:
        max-size: "5m"
        max-file: "10"
    networks:
      nginx-proxy:
        ipv4_address: 172.30.0.2

  httpd_proxy:
    container_name: ${COMPOSE_PROJECT_NAME}_httpd_proxy
    build: ${PWD}/httpd_proxy
    ports:
      - "8888:8888"
    volumes:
      - ${PWD}/httpd_proxy/conf.d/httpd.conf:/usr/local/apache2/conf/httpd.conf
      - ${PWD}/httpd_proxy/conf.d/proxy-html.conf:/usr/local/apache2/conf/extra/proxy-html.conf
      - ${PWD}/httpd_proxy/resolv.conf:/etc/resolv.conf
    extra_hosts:
      - "host.docker.internal:host-gateway"
    networks:
      nginx-proxy:
        ipv4_address: 172.30.0.110

  nginx:
    build: ./nginx
    container_name: ${COMPOSE_PROJECT_NAME}_${NGINX_CONTAINER_NAME}
    restart: always
    environment:
      VIRTUAL_HOST: ${HOSTNAME}
      CERT_NAME: ${CERTS_FILE_NAME}
      HTTPS_METHOD: noredirect
    env_file:
      - .env
    volumes:
      - ${PWD}/react/app/build:/usr/share/nginx/html
      - ${PWD}/${NGINX_CONF_DIR}:/etc/nginx/conf.d:rw
    command: /bin/sh -c "DOLLAR=$ envsubst < /etc/nginx/conf.d/default.conf.tpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
    working_dir: /usr/share/nginx/html
    networks:
      nginx-proxy:
        ipv4_address: 172.30.0.3

volumes:
  node_volumes:
    name: nginx_proxy_node_volumes
    labels:
      keep: true

networks:
  nginx-proxy:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.30.0.0/24
          gateway: 172.30.0.1
    external: false

```

それぞれのコンテナのIP固定化

#### coredns DoH (dns over https) 対応

`corefile`

```txt
https://.:443 {
    tls /certs/server.crt /certs/server.key
    hosts /etc/coredns/hosts_doh {
      fallthrough
    }
    forward . 8.8.4.4 8.8.8.8
    log
    cache 30
}

. {
  hosts /etc/coredns/hosts_proxy {
    fallthrough
  }
  forward . 8.8.4.4 8.8.8.8
  log
  cache 30
}
```

`hosts_doh`

```txt
127.0.0.1 www.yahoo.co.jp
```

`hosts_proxy`

172.30.0.3 www.yahoo.co.jp

### nginx-proxy

/etc/nginx/conf.d/dns-conf

```bash
server {
    listen              80                 ;
    listen       443 ssl ;
    listen       [::]:443 ssl ;
    server_name      localhost;
    ssl_certificate     /etc/nginx/certs/server.crt;
    ssl_certificate_key /etc/nginx/certs/server.key;

    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    location /dns-query {
        proxy_buffers 8 32K; # default 8 4k|8k
        proxy_buffer_size 32k; # default 4k|8k
        proxy_busy_buffers_size 64k; # default 8k|16k
        proxy_request_buffering off;
        proxy_buffering off;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://coredns:443;
    }

   location / {
      root  /usr/share/nginx/html;
      index nginx-proxy.html;
   }
}
```

***`localhost/dns-query` で doh を実現***

#### http-proxy

`httpd.conf`

```bash
ServerRoot "/usr/local/apache2"

Listen 80
LoadModule mpm_event_module modules/mod_mpm_event.so
LoadModule authn_file_module modules/mod_authn_file.so
LoadModule authn_core_module modules/mod_authn_core.so
LoadModule authz_host_module modules/mod_authz_host.so
LoadModule authz_groupfile_module modules/mod_authz_groupfile.so
LoadModule authz_user_module modules/mod_authz_user.so
LoadModule authz_core_module modules/mod_authz_core.so
LoadModule access_compat_module modules/mod_access_compat.so
LoadModule auth_basic_module modules/mod_auth_basic.so
LoadModule reqtimeout_module modules/mod_reqtimeout.so
LoadModule filter_module modules/mod_filter.so
LoadModule proxy_html_module modules/mod_proxy_html.so
LoadModule mime_module modules/mod_mime.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule env_module modules/mod_env.so
LoadModule headers_module modules/mod_headers.so
LoadModule setenvif_module modules/mod_setenvif.so
LoadModule version_module modules/mod_version.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_connect_module modules/mod_proxy_connect.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule unixd_module modules/mod_unixd.so
LoadModule status_module modules/mod_status.so
LoadModule autoindex_module modules/mod_autoindex.so
<IfModule !mpm_prefork_module>
	#LoadModule cgid_module modules/mod_cgid.so
</IfModule>
<IfModule mpm_prefork_module>
	#LoadModule cgi_module modules/mod_cgi.so
</IfModule>
LoadModule dir_module modules/mod_dir.so
LoadModule alias_module modules/mod_alias.so

<IfModule unixd_module>
User www-data
Group www-data

</IfModule>
ServerAdmin you@example.com
<Directory />
    AllowOverride none
    Require all denied
</Directory>
DocumentRoot "/usr/local/apache2/htdocs"
<Directory "/usr/local/apache2/htdocs">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
<Files ".ht*">
    Require all denied
</Files>
ErrorLog /proc/self/fd/2
LogLevel warn

<IfModule log_config_module>
    LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "%h %l %u %t \"%r\" %>s %b" common

    <IfModule logio_module>
      LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    </IfModule>
    CustomLog /proc/self/fd/1 common
</IfModule>

<IfModule alias_module>
    ScriptAlias /cgi-bin/ "/usr/local/apache2/cgi-bin/"

</IfModule>

<IfModule cgid_module>
</IfModule>

<Directory "/usr/local/apache2/cgi-bin">
    AllowOverride None
    Options None
    Require all granted
</Directory>

<IfModule headers_module>
    #
    # Avoid passing HTTP_PROXY environment to CGI's on this or any proxied
    # backend servers which have lingering "httpoxy" defects.
    # 'Proxy' request header is undefined by the IETF, not listed by IANA
    #
    RequestHeader unset Proxy early
</IfModule>

<IfModule mime_module>
    TypesConfig conf/mime.types
    AddType application/x-compress .Z
    AddType application/x-gzip .gz .tgz
</IfModule>
<IfModule proxy_html_module>
Include conf/extra/proxy-html.conf
</IfModule>
<IfModule ssl_module>
SSLRandomSeed startup builtin
SSLRandomSeed connect builtin
</IfModule>
```

`/etc/nginx/conf.d/http_proxy.conf`

```bash
ProxyHTMLLinks	a		href
ProxyHTMLLinks	area		href
ProxyHTMLLinks	link		href
ProxyHTMLLinks	img		src longdesc usemap
ProxyHTMLLinks	object		classid codebase data usemap
ProxyHTMLLinks	q		cite
ProxyHTMLLinks	blockquote	cite
ProxyHTMLLinks	ins		cite
ProxyHTMLLinks	del		cite
ProxyHTMLLinks	form		action
ProxyHTMLLinks	input		src usemap
ProxyHTMLLinks	head		profile
ProxyHTMLLinks	base		href
ProxyHTMLLinks	script		src for

# To support scripting events (with ProxyHTMLExtended On),
# you'll need to declare them too.

ProxyHTMLEvents	onclick ondblclick onmousedown onmouseup \
		onmouseover onmousemove onmouseout onkeypress \
		onkeydown onkeyup onfocus onblur onload \
		onunload onsubmit onreset onselect onchange

<IfModule mod_proxy.c>
    ProxyRequests On
    ProxyVia On
    Listen 8888
    <Proxy *>
        Order deny,allow
        Deny from all
        Allow from all
    </Proxy>
</IfModule>

```

`/etc/resolve.conf`

```bash
nameserver 172.30.0.100
options ndots:0
```
