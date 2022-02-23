---
title: "xmllint"
date: "2022-02-23 02:34:19"
post_modified: "2022-02-23 02:34:19"
description: "html ファイルのスクレイピング、Dockerへインストール"
categories: ["Tools"]
tags: ["Xmllint", "Scraping", "Docker"]
draft: false
---

## HTML

HTML 内の`<img srs="xxx">`から画像をダウンロード

- $target_content: HTML コンテンツ
- $img_dir: アウトプットパス

```bash
 echo  "$target_content" | \
 xmllint --html --xpath '//img/@src' - | \
 xargs -n 1 | \
 cut -d= -f2 | \
 sed 's/^\/\//https:\/\//' | \
 xargs -n 1 curl -L#O --output-dir "$img_dir"
```

HTML 内に`<img srs="xxx">`がないと `Empty`のエラーが出るので`if`で対応

```bash
key="<img src="
if [[ $target_content =~ $key ]]; then
 echo "img src in"
 echo  "$target_content" | \
 xmllint --html --xpath '//img/@src' - | \
 xargs -n 1 | \
 cut -d= -f2 | \
 sed 's/^\/\//https:\/\//' | \
 xargs -n 1 curl -L#O --output-dir "$img_dir"
else
   	echo "img src none"
fi
```

## Docker へ Install

Alpine 系

```docker
RUN apk add --upgrade libxml2 libxml2-utils
```
