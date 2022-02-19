---
title: "Ansible, Let's Encrypt"
date: "2020-12-14 13:15:14"
post_modified: "2020-12-14 13:15:14"
description: "今後Let's Encryptの設定はAnsibleで行いたい。AnsibleのLet's Encryptテンプレート"
categories: ["Linux", "Security"]
tags: ["CentOS7", "Apache", "Ansible", "Let's Encrypt", "Cron"]
draft: false
---

# Ansible, Let's Encrypt

## Install cerbot tasks

```yaml
- name: check installed cerbot
  command: bash -lc "certbot --version"
  register: certbot_exists
  changed_when: False
  ignore_errors: yes

- name: install epel-release
  become: true
  yum:
    name: epel-release
    state: present
    #when:
    #  - certbot_exists is failed

- name: Install certbot,certbot-apache
  become: true
  yum: name=certbot,certbot-apache state=present

- name: Install python-certbot-apache
  become: true
  yum: name=python-certbot-apache state=present

- name: Set config to stop and restart with running certbot
  become: yes
  replace:
    dest: /etc/sysconfig/certbot
    regexp: "{{ item.regexp }}"
    replace: "{{ item.replace }}"
    backup: yes
  with_items:
    - { "regexp": '^PRE_HOOK=""$', "replace": 'PRE_HOOK="--pre-hook ''systemctl stop httpd''"' }
    - { "regexp": '^POST_HOOK=""$', "replace": 'POST_HOOK="--post-hook ''systemctl restart httpd''"' }
    - { "regexp": '^RENEW_HOOK=""$', "replace": 'RENEW_HOOK="--renew-hook ''systemctl restart httpd''"' }
```

## VirtualHost vars

```yaml
httpd:
  virtualhosts:
    - hostname: "virtualexample1.com"
      ssl: true
      document_root: "/var/www/vhosts/virtualexample1.com"
      log: "/var/www/vhosts/virtualexample1.com/LOG"
      conf_options:
        - AllowOverride All
        - Options -Indexes +FollowSymLinks
        - Options +ExecCGI
        - AddHandler cgi-script .pl .cgi
        - Order allow,deny
        - Allow from all
      conf_ssl_options:
        - AllowOverride All
        - Options -Indexes +FollowSymLinks
        - Options +ExecCGI
        - AddHandler cgi-script .pl .cgi
        - Order allow,deny
        - Allow from all
      owner: "vh1"
      group: "vh1"
      recurse: "yes"
      server_crt: "/etc/pki/tls/certs/localhost.crt"
      server_key: "/etc/pki/tls/private/localhost.key"
      server_chain: "/etc/pki/tls/certs/ca-bundle.crt"
      letsencrypt:
        state: "present"
        name: "letsencrypt virtualexample1.com"
        email: "admin@virtualhostexample1.com"
        cron:
          - name: "letsencrypt 001"
            state: "present"
            user: "root"
            minute: "0"
            hour: "12"
            day: "1"
            month: "*"
            weekday: "*"
          - name: "letsencrypt 002"
            state: "present"
            user: "root"
            minute: "0"
            hour: "13"
            day: "1"
            month: "*"
            weekday: "*"
```

## Get cert

```yaml
 ---
# tasks file for roles/httpd
# letsncryp

- name: Check privkey.pem exists
  become: true
  stat:
    path: "/etc/letsencrypt/live/{{ item.value.httpd.hostname }}/privkey.pem"
  register: key_exists
  when:
    - item.value.httpd.ssl.ssl_provider == 'letsencrypt'
  with_dict:
    - "{{ virtualhosts }}"

- name: Get certs
  become: yes
  shell: >
    certbot certonly -m {{ item.item.value.httpd.ssl.letsencrypt.email }}
    --agree-tos
    --non-interactive $*
    --webroot
    -w {{ item.item.value.httpd.host_dir }}{{ item.item.value.httpd.public_dir }}
    -d {{ item.item.value.httpd.hostname }}
  when:
    - item.item.value.httpd.ssl.ssl_provider == 'letsencrypt'
    - item.stat.exists is false
    - item.item.value.httpd.ssl.letsencrypt.state == 'present'
  with_items:
    - "{{ key_exists.results }}"

- name: Install VirtualHost(https)
  become: true
  template:
    src: templates/letsencrypt_virtualhost.conf.j2
    dest: "/etc/httpd/conf.d/letsencrypt_{{ item.value.httpd.hostname }}.conf"
  when:
    - item.value.httpd.ssl.ssl_provider == 'letsencrypt'
  with_dict:
    - "{{ virtualhosts }}"
  notify:
    - Restart httpd

- name: Remove VirtualHost(https)
  become: true
  file:
    path: "/etc/httpd/conf.d/letsencrypt_{{ item.value.httpd.hostname }}.conf"
    state: absent
  when:
    - item.value.httpd.ssl.ssl_provider != 'letsencrypt'
  with_dict:
    - "{{ virtualhosts }}"
  notify:
    - Restart httpd

- name: Remove keys
  become: true
  include: letsencrypt_delete_loop.yml
  when:
    - item.value.httpd.ssl.ssl_provider != 'letsencrypt'
  with_dict:
    - "{{ virtualhosts }}"
  notify:
    - Restart httpd
```

## Cron vars

```yaml
crontab:
  letsencrypt:
    name: "letsencrypt {{ httpd_domain }}"
    state: "present"
    user: "root"
    job: /bin/bash -lc "certbot certonly --force-renew --webroot -w {{ httpd_document_root }}{{ httpd_public_dir }} -d {{ httpd_domain }} --post-hook 'systemctl reload httpd' > /dev/null 2>&1"
    minute: "0"
    hour: "12"
    day: "1"
    month: "*"
    weekday: "*"
```

## Cron tab

```yaml
---
- name: Cron control
  become: yes
  cron:
    name: " {{ item.value.name }}"
    state: "{{ item.value.state }}"
    user: "{{ item.value.user }}"
    minute: "{{ item.value.minute }}"
    hour: "{{ item.value.hour }}"
    day: "{{ item.value.day }}"
    month: "{{ item.value.month }}"
    weekday: "{{ item.value.weekday }}"
    job: "{{ item.value.job }}"
  with_dict:
    - "{{ crontab }}"
```

## letsencrypt_virtualhost.conf (Jinja2 template)

```conf
  ServerName {{ item.value.httpd.hostname }}
  DocumentRoot {{ item.value.httpd.host_dir }}{{ item.value.httpd.public_dir }}
  SSLEngine on
  SSLCipherSuite AES256+EECDH:AES256+EDH
  SSLProtocol All -SSLv2 -SSLv3
  SSLHonorCipherOrder On
  SSLCertificateFile /etc/letsencrypt/live/{{ item.value.httpd.hostname }}/cert.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/{{ item.value.httpd.hostname }}/privkey.pem
  SSLCertificateChainFile /etc/letsencrypt/live/{{ item.value.httpd.hostname }}/chain.pem

  {% for n in item.value.httpd.conf_ssl_options %}
    {{ n }}
  {% endfor %}

  ErrorLog {{ item.value.httpd.log }}/error.log
  CustomLog {{ item.value.httpd.log }}/access.log combined
```
