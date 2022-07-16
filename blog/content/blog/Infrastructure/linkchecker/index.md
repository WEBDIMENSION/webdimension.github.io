---
title: "WEBサイト内 404 not found チェック"  
date: "2022-03-15 06:00:12"  
post_modified: "2022-03-15 06:00:12"  
description: "linkchecker の Docker環境を作りで Global, Local 問わず404をチェック"  
categories: ["infrastructure"]  
tags: ["Docker", "Docker-compose", "Docker Registry"]  
draft: false
---

## 👀 Overview

- ローカル、グローバル問わず404チェックをしたい。
- GUIアプリはインストールしたくない
- 解析結果のファイルフォーマットは最低でも html,csv があればよい。

## 🚀 Usage

### 🐳 Docker-compose

```bash
# Repository clone
git pull https://github.com/WEBDIMENSION/docker_image_linkchecker.git linkchecker
```

```bash
# envファイルコピー
cd linkchecker 
cp .env.example .env
```

```bash
# Edite .env
DIR_PATH=.
PROJECT_NAME=linkchecker
TARGET_URL=<<TARGET_URL>>  # <- Your site address
```

```bash
# docker-compose 実行
docker-compose run --rm linkchecker
```

### 🐳 Docker

```bash
# Image pull
docker pull ghcr.io/webdimension/linkchecker

# Exec
docker run --rm \
-v /Users/your_name/CloudStation/workspace/projects/GitHub/linkchecker/src:/workspace/src \
-v /Users/your_name/CloudStation/workspace/projects/GitHub/linkchecker/output:/workspace/output \
--env-file /Users/your_name/CloudStation/workspace/projects/GitHub/linkchecker/.env \
--workdir="/workspace/src" \
--entrypoint "./linkchecker.sh" \
--name linkchecker ghcr.io/webdimension/linkchecker:latest
```

## 📝 404チェック解析結果ファイル

`output/repo/` 配下にファイルが生成される

## ⚠ Linkchecker 注意点

**Gatsby,js**などをローカルで404チェックを行う際は `develop mode` では正しい結果は帰ってこない。  
`product mode` で立ち上げれば正常動作する。

## linkchecker 解析結果フォーマット

```bash
# Format html
linkchecker -o text -Fhtml/report/linkchecker.report.html http://localhost
```

```bash
# create sitemap
linkchecker -o text -Fsitemap/report/linkchecker.report.sitemap http://localhost
```

```bash
# Format CSV
linkchecker --no-status -v  -o text -Fcsv/report/linkchecker.report.csv http://localhost
```

```bash
# Format SQL
linkchecker -o text -Fsql/report/linkchecker.report.sql http://loalhost
```

```bash
# Format dotL
linkchecker -o text -Fdot/report/linkchecker.report.dot http://loalhost
```

```bash
# Format failures
linkchecker -o text -Ffailures/report/linkchecker.report.failures http://loalhost
```
