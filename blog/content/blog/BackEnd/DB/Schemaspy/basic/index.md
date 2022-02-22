---
title: "Schemaspy"
date: "2022-02-23 04:43:32"
post_modified: "2022-02-23 04:43:32"
description: "Schemaspy を使ってDBドキュメント(ER図、リレーション図)を自動生成"
categories: ["BackEnd"]
tags: ["Schemaspy", "Database"]
draft: false
---

## Driver download

### MySQL

```bash
mkdir -p drivers
curl -L https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.16.tar.gz |
    tar xvzf - -C drivers --strip=1 mysql-connector-java-8.0.16/mysql-connector-java-8.0.16.jar
```

## コマンド

起動時に Document は生成される。  
再生性は以下のコマンド。

```bash
# Document生成
docker-compose run schemaspy
```

##
