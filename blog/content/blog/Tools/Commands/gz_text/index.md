---
title: "gzip形式(拡張子「.gz」を解凍せずに確認"
date: "2023-02-07 15:41:11"
post_modified: "2023-02-07 15:41:11"
description: "zless, zgrep でgzip形式のファイルを解凍せずに確認"
categories: ["Tools"]
tags: ["Command", "gzip", "テキスト処理"]
topics: ""
draft: false
---

## zless

```bash
# zless ファイル名 [ファイル名2 ･･･]```
zless error_log.gz
```

## zgrep

```bash
# zgrep [ grep_options ] [ -e ] pattern filename ...
zgrep -nH "Erroe" error.log.gz
```
