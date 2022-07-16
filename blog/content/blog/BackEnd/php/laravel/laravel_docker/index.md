---
title: "Laravel を動かすDocker環境(Docker-compose)"
date: "2020-12-15 12:19:59"
post_modified: "2020-12-15 12:29:11"
description: "laravelを動かすDocker-compose の一例"
categories: ["BackEnd"]
tags: ["PHP", "Docker", "Laravel"]
draft: false
---

## Laravel を動かす Docker 環境(Docker-compose)

### docker-compose.yml

```yaml
version: "3"
services:
  php:
    build: ${DIR_PATH}/php
    container_name: ${COMPOSE_PROJECT_NAME}_php
    volumes:
      - ${DIR_PATH}/../Laravel:/var/www/html
      - .${DIR_PATH}/php/php.ini:/usr/local/etc/php/php.ini
      - ${DIR_PATH}/php/conf.d/xdebug.ini:/usr/local/etc/php/conf.d/xdebug.ini
    external_links:
      - smtp
    #      - mysql5.7:mysql5.7
    depends_on:
      - mysql
    links:
      - mysql:mysql
  nginx:
    image: nginx
    container_name: ${COMPOSE_PROJECT_NAME}_nginx
    environment:
      - VIRTUAL_HOST=${VIRTUAL_HOST}
      - CERT_NAME=server
    volumes:
      - ${DIR_PATH}/php/logs:/var/logs/nginx
      - ${DIR_PATH}/../Laravel:/var/www/html
      - ${DIR_PATH}/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf
    links:
      - php:php
    depends_on:
      - php
  mysql:
    image: mysql:5.7
    container_name: ${COMPOSE_PROJECT_NAME}_mysql5_7
    user: "1000:50"
    volumes:
      - ${DIR_PATH}/mysql/my.cnf:/etc/mysql/my.cnf
      - ${DIR_PATH}/mysql/data:/var/lib/mysql
      - ${DIR_PATH}/mysql/init:/docker-entrypoint-initdb.d
      - ${DIR_PATH}/mysql/logs:/var/log/mysql
    environment:
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    ports:
      - ${DB_PORT}:3306
    command: mysqld --character-set-server=utf8 --collation-server=utf8_unicode_ci --innodb-buffer-pool-size=256M --innodb_use_native_aio=0
  redis:
    image: redis:latest
    container_name: ${COMPOSE_PROJECT_NAME}_redis
    user: "999:redis"
    ports:
      - ${REDIS_PORT}:6379
    volumes:
      - ${DIR_PATH}/redis/data:/data

  node:
    image: node:10
    container_name: ${COMPOSE_PROJECT_NAME}_node
    volumes:
      - ${DIR_PATH}/../Laravel/node:/node
      - ${DIR_PATH}/node/certs:/certs
    working_dir: /node
    environment:
      CERTS_DIR_PATH: /certs/
      REDIS_HOST: ${REDIS_HOST}
      REDIS_PORT: ${REDIS_PORT}
      MIX_NODE_PORT: ${MIX_NODE_PORT}
    ports:
      - ${MIX_NODE_PORT}:3000
    command: bash -c  "npm install && npm start"
    depends_on:
      - mysql
networks:
  default:
    external:
      name: nginx-proxy
```

### .env

_Require_ \<Your xxx\>

```env
COMPOSE_PROJECT_NAME=<Your project name>
DIR_PATH=<Your Absolute path> # /var/www/xxxxx
APP_NAME=Tournament
APP_ENV=local
APP_KEY=<Your APP_KEY>
APP_DEBUG=true
VIRTUAL_HOST=<Your host> # example.local
APP_URL=https://"${VIRTUAL_HOST}"

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
DB_ROOT_PASSWORD=root

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
QUEUE_CONNECTION=sync
SESSION_DRIVER=database
SESSION_LIFETIME=120

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

DEV_FAKER_LOCALE=ja_JP

MIX_NODE_HOST="${VIRTUAL_HOST}"
MIX_NODE_INTERNAL_HOST=node
MIX_NODE_PORT=3000
```

### Dockerfile

```Docer
FROM php:7.2.8-fpm
RUN apt-get update && apt-get install -y \
  libssl-dev \
  git \
  wget \
  unzip \
  vim
RUN apt-get -y update
RUN apt-get install -y \
    curl \
    gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
# PDO
RUN docker-php-ext-install pdo_mysql
# redis
RUN docker-php-source extract
RUN git clone -b 4.1.1 --depth 1 https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis && \
    docker-php-ext-install redis
# xdebug
RUN pecl install xdebug \
  && docker-php-ext-enable xdebug
# php-zip
RUN apt-get install -y zlib1g-dev \
    && docker-php-ext-install zip
##Chrome Driver RUN apt-get install -y libnss3
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN echo "deb http://dl.googlttcom/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
#RUN apt-get update && apt-get install -y google-chrome-stable
# GD
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd
# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

### nginx default.conf

```conf
server {
  listen      80;
  server_name YOUR_HOSTNAME;  // maybe equals VIRTUAL_HOST in .env
    root /var/www/html/public;
  location / {
    try_files $uri $uri/ /index.php$is_args$args;
    index index.html index.php;
  }
  location ~ \.php$ {
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass php:9000;
    fastcgi_index index.php;
    include fastcgi_params;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      fastcgi_param PATH_INFO $fastcgi_path_info;
  }
}
```
