---
title: "Nginx conf"
date: "2022-02-23 04:28:25"
post_modified: "2022-02-23 04:28:25"
description: "Nginx 設置ファイル コピペ用"
categories: ["BackEnd"]
tags: ["Nginx"]
draft: false
---

## Reverse Proxy

```bash
# Basic
http {
  upstream  app1 {
    server 192.168.1.10:8080;
    server 192.168.1.11:80;
    server 192.168.1.12:8080;
  }

  server {
    listen 80;
    location / {
      proxy_pass http://app1;
     }
  }

}

```

## Header

```bash
#header
server {
  # hostname (upstream name)
  proxy_set_header Host                  $host;
  # client IP Address $B$=$l$>$l$N%j%P!<%9%W%m%-%7$G@hF,$KDI2C!#%+%s%^6h@Z$j(B
  proxy_set_header X-Forwarded-For       $proxy_add_x_forwarded_for;
  # $B<u?.$7$?(BHost header
  proxy_set_header X-Forwarded-Host      $host;
  # host name
  proxy_set_header X-Forwarded-Server    $hostname;
  # client IP Address
  proxy_set_header X-Real_IP             $reomote_addr;
}
```

## Keep-Alive

```bash
# For client
server {
  ...
  keepalive_timeout 60;
}

# For backend
http {
  upstream  backend {
    server 192.168.1.10:8080;
    server 192.168.1.11:80;
    server 192.168.1.12:8080;
  }

  server {
    listen 80;
    location / {
      proxy_http_verssion 1.1;
      proxy_set_header Connection "";
      proxy_pass http://backend;

     }
  }

}
```

## Redirect

```bash

http {
  upstream  backend {
    server 192.168.1.10:8080;
    server 192.168.1.11:80;
    server 192.168.1.12:8080;
  }

  server {
    listen 80;
    server_name example.com;

    location /one/ {
      proxy_pass http://backend/two;
      proxy_redirect http://backend/two http://example.com/one/; # default
     }

    location /two/ {
      rewrite   ~/three/1 /three/2
      proxy_pass http://backend/for/;
      # URL$B$r=q$-49$($?>l9g$OL@<(E*$K$b$H$KLa$9(B
      proxy_redirect http://backend/four/2 http://example.com/three/1/;
     }
  }

}

```

## Cookie

```bash

  server {
    listen 80;
    server_name example.com;

    location /one/ {
      proxy_pass http://backend/two;
      proxy_cookie_path  /two/  /one/
      proxy_cookie_domain backened $server_name
     }
  }

```

## weight

```bash
  upstream  backend {
    server 192.168.1.10 weight=2;
    server 192.168.1.11:weight=1;
    server 192.168.1.12;  #default is weight=1
  }
```

## basckup server

```bash
# 192.168.1.10 $B$,(BDown$B$7$?>l9g$K(B 192.168.1.11$B$,(Bup
  upstream  backend {
    server 192.168.1.10;
    server 192.168.1.11 backup;
  }
```

## Connect to Min Conection counts server

```bash
  least_conn; #minimum connection
  upstream  backend {
    server 192.168.1.10;
    server 192.168.1.11;
  }
```

## Hash

```bash
#User-Agent
  upstream  backend {
    hash $http_user_agent
    server 192.168.1.10;
    server 192.168.1.11;
  }

# path
# consistent $B$O%5!<%P$NBf?t$J$I$,JQ$o$C$?>l9g$K$bBP1~(B
  upstream  backend {
    hash $url consistent
    server 192.168.1.10;
    server 192.168.1.11;
  }
```

## timeout

```bash
    location /one/ {
      proxy_pass http://backend/two;
      proxy_content_timeout   60s;
      proxy_read_timeout   60s;
      proxy_send_timeout   60s;
     }
```

## cache

```bash
proxy_cache_path /var/cache/nginx/rproxy
                levels=1:2 keys_zone=proxy1:10m
                inactive=1d;
#key_zone name:volume

http {
  upstream  app1 {
    server 192.168.1.10;
  }

  server {
    listen 80;
    location / {
      proxy_cache proxy1
      # Not use cashe
      proxy_chache_bypass $http_authorization $jttp_cookie;
      # Not use cashe
      proxy_no_chache $http_authorization $jttp_cookie;
      proxy_pass http://app1;
     }
  }

}

```

## SSL

```bash

http {
  upstream  app1 {
    server 192.168.1.10;
  }

  server {
    listen 443 ssl;
    ssl_certificate /etc/...../server.crt
    ssl_certificate_key /etc/....../server.key
    location / {
      proxy_cache proxy1
      # Not use cashe
      proxy_chache_bypass $http_authorization $jttp_cookie;
      # Not use cashe
      proxy_no_chache $http_authorization $jttp_cookie;
      proxy_pass http://app1;
     }
  }

}

# If backend use SSL
http {
  upstream  app1 {
    server 192.168.1.10:443;
  }

  server {
    location / {
      proxy_no_chache $http_authorization $jttp_cookie;
      proxy_pass http://app1;
     }
  }

}


```

## webSocket

```bash
http {
  upstream  app1 {
    server 192.168.1.10:443;
  }

  server {
    location /chat/ {
      proxy_pass http://app1;
      proxy_http_verssion 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Upgrade Connection $connection_upgrade;
      proxy_read_timeout 1h;
     }
  }

}

```

## File upload size & Buffer

```bash

  server {
    location /chat/ {
    ...
    cliecnt_max_body_size 100m; # Max 100MB
    client_body_buffer_size 1m; # Max 1MB on memory  0 is no limit
    client_body_temp_path /var/tmp/nginx_temp 1 2;  # buffer on file when size over
     }
  }

  #No buffering
  server {
    location /chat/ {
    ...
    proxy_reqest_buffering off;
    proxy_http_verssion 1.1; # when use chanck
     }
  }

```

## For maintenance

```bash
geo $maintenance{
  default         1;
  192.168.1.0/24  0;
}
  server {

  error_page 503 /503.html;

  location = /503.html{
      root /path/to/eroorpage;
      internal
  }

  location /image/ {
    alias /path/to/image/;
  }

  location /css/ {
    alias /path/to/css/;
  }

  location / {
    if($maintenace){
      return 503;
    }
    proxy_pass ....;
  }
```
