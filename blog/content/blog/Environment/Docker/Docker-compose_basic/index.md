---
title: "Docker-compose よく使うコマンド"
date: "2022-02-23 00:14:13"
post_modified: "2022-02-23 00:14:13"
description: "localの開発環境でよく使われる docker-compose。docker-composeコマンドのカンニング用"
categories: ["Environment"]
tags: ["Docker", "開発環境", "Docker-compose"]
draft: false
---

## build

```bash
docker-compose build
```

## 確認

```bash
docker-compose config
```

## Down

```bash
docker-compose down
# optin
## image 削除
--rmi all
```

## コンテナからのイベントを受信

```bash
docker-compose events
```

## コマンド実行

```bash
docker-compose exec <service_name> <command>
# Example
## Bash でコンテナにログイン
docker-compose exec nginx bashe
```

## Image List

```bash
docker-compose images
```

## 強制終了

```bash
docker-compose kill
```

## ログ

```bash
docker-compose logs
```

## 一時停止

```bash
docker-compose pause
```

## Process

```bash
docker-compose ps
```

## Process info

```bash
docker-compose top
```

## Restart

```bash
docker-compose restart
```

## コンテナ削除

```bash
docker-compose rm
```

## コンテナ削除

```bash
docker-compose run <service_name> <command> <arguments...>
# Example
docker-compose run web rails s
```

## Start

```bash
docker-compose start
```

## Stop

```bash
docker-compose stop
```

## Up

```bash
docker-compose up
# Option
## Deamon
-d
```
