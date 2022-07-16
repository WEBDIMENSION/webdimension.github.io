---
title: "Laravel, CircleCI"
date: "2020-12-14 12:35:34"
post_modified: "2020-12-14 12:57:08"
description: "laravelをCircleCIの備忘録"
categories: ["BackEnd"]
tags: ["PHP", "Laravel", "CI/CD", "Circle-CI"]
draft: false
---

## Laravel, CircleCI

### Circle-ci Laravel

Make directory (project top)

```bash
mkdir .circle-ci
```

Create config.yml

```bash
vim config.yml
```

```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/php:7.2-stretch-node-browsers
        environment:
          - APP_URL: http://localhost:8000
          - APP_DEBUG: true
          - APP_ENV: testing
          - APP_KEY: <APP_KEY>
          - DEV_FAKER_LOCALE: ja_JP
          - DB_CONNECTION: circleci
          - MIX_NODE_HOST: <YOUR_HOSTNAME>
          - MIX_NODE_INTERNAL_HOST: localhost
          - MIX_NODE_PORT: 3000
          - REDIS_PORT: 6379
      - image: circleci/mysql:5.7
        environment:
          - MYSQL_ALLOW_EMPTY_PASSWORD: true
          - MYSQL_ROOT_PASSWORD: root
          - MYSQL_DATABASE: laravel
          - MYSQL_USER: laravel
          - MYSQL_PASSWORD: laravel
      - image: node:10
      - image: redis:latest
      - image: selenium/hub:3.141.59-vanadium
      - image: selenium/node-chrome:3.141.59-vanadium
        environment:
          - HUB_HOST: localhost
          - HUB_PORT: 4444

    working_directory: ~/repo

    steps:
      - run:
          command: chromedriver
          background: true

      - checkout

      - run:
          name: install dockerize
          command: wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && sudo tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
          environment:
            DOCKERIZE_VERSION: v0.6.1

      - run:
          name: Install PHP Extensions
          command: sudo docker-php-ext-install pdo_mysql

      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "Laravel/composer.json" }}
            - v1-dependencies-

      - restore_cache:
          keys:
            - v1-node-{{ checksum "Laravel/node/package.json" }}
            - v1-node-

      - run:
          name: npm install
          working_directory: Laravel/node
          command: npm install

      - run:
          name: start node server
          working_directory: Laravel/node
          command: node ./bin/node_server.js
          background: true
          environment:
            - CERTS_DIR_PATH: /home/circleci/repo/docker/node/certs/
            - REDIS_HOST: 0.0.0.0
            - REDIS_PORT: 6379

      - run:
          name: composer install
          working_directory: Laravel
          command: composer install -n --prefer-dist

      - save_cache:
          paths:
            - ./Laravel/vendor
          key: v1-dependencies-{{ checksum "Laravel/composer.json" }}

      - save_cache:
          paths:
            - ./Laravel/node/node_modules
          key: v1-node-{{ checksum "Laravel/node/package.json" }}

      - run:
          name: Wait for db
          command: dockerize -wait tcp://localhost:3306 -timeout 1m

      - run:
          name: Migration & Seeding
          working_directory: Laravel
          command: php artisan migrate --seed

      - run:
          name: Artisan command
          working_directory: Laravel
          command: php artisan command:tournament 1

      #      - run:
      #          name: Install Chrome Driver
      #          working_directory: Laravel
      #          command: php artisan dusk:chrome-driver

      #      - run:
      #          name: Start Chrome Driver
      #          working_directory: Laravel
      #          command: ./vendor/laravel/dusk/bin/chromedriver-linux
      #          background: true
      #
      #      - run:
      #          name: Start Chrome Driver
      #          working_directory: Laravel
      #          command: chmod 775 .vendor/laravel/dusk/bin/* && ./vendor/laravel/dusk/bin/chromedriver-linux
      #          background: true

      - run:
          name: phpcs
          working_directory: Laravel
          command: ./vendor/bin/phpcs --standard=phpcs.xml ./

      - run:
          name: Run Laravel Server
          working_directory: Laravel
          command: php artisan serve
          background: true

      - run:
          name: phpunit
          working_directory: Laravel
          command: ./vendor/bin/phpunit

      #      - run:
      #          name:  Chrome version
      #          working_directory: Laravel
      #          command: google-chrome --version
      #
      #      - run:
      #          name: Top
      #          working_directory: Laravel
      #          command: curl localhost:8000
      #
      - run:
          name: dusk
          working_directory: Laravel
          command: php artisan dusk
```

### Circle-CI-CLI ( Exec circle-cli on local )

Install for Linux , Mac

```bash
curl -fLSs https://circle.ci/cli | bash
```

Ansible tasks

```yaml
# tasks file for circlci
- name: check installed docker
  command: bash -lc "circleci --version"
  register: circleci_exists
  changed_when: False
  ignore_errors: yes

- name: Install circleci
  become: yes
  get_url:
    url: "https://circle-downloads.s3.amazonaws.com/releases/build_agent_wrapper/circleci"
    dest: /usr/local/bin/circleci
    mode: +x
  when: circleci_exists is failed
```

### Varidate

```bash
circleci config validate -c .circleci/config.yml
```

### Exec

```bash
circleci build .circleci/config.yml
```
