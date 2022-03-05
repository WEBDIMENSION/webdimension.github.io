# WordPress to Gatsby.js

## WordPress の MySQL をLocalへインポート

[MySQL_Sync](https://github.com/WEBDIMENSION/mysql_sync/tree/master/mysql8/Docker/mysql_sync) を使用

## Pythonから MySQL 操作し WordPress の Post されたデータを html ファイルへエクスポート

Intellij IDEA にて Remote 設定しておく MySQL を起動しておく

```bash
docker-compose up -d mysql
```

## html エクスポート時に Frontmatter をファイル先頭に挿入

Template jinja2 仕様

```html

<head>
    <meta charset="utf-8"/>
</head>
---<br/>
title: "{{post_title}}"<br/>
date: "{{post_date}}"<br/>
post_modified: "{{post_modified}}"<br/>
description: "{{post_expect}}"<br/>
categories: {{categories}}<br/>
tags: {{tags}}<br/>
draft: {{draft}}<br/>
---<br/>

<h1>{{post_title}}</h1>
{{post_content}}
 ```

## Pandoc にて html -> markdown へ変換する

`Gatsby_Root_DIr/blob/content/blog` へエクsポート

```bash
docker-compose run pandoc
```

---

## Linkchecker

Gatsby を `production mode` で起動   
port: 9000 と仮定

```bash
docker-compose exec gatsby yarn serve
```

```bash
docker-compose run linkchecker -o text -Fhtml/report/linkchecker.report.html http://gatsby:9000/
```

[linkchecker command](linkchecker/README.md)

