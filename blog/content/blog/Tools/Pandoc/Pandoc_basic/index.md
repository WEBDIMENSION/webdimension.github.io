---
title: "Pandoc 環境構築 (Docker) と基本コマンド"
date: "2022-02-23 01:56:57"
post_modified: "2022-02-23 01:56:57"
description: "Pandocを使って htnlファイルを Markdown へ変換"
categories: ["Tools"]
tags: ["Pandoc", "テキスト処理", "Docker"]
draft: false
---

## HTML -> MARKDOWN

```bash
pandoc -o "$markdown_file" --wrap=preserve "$html_file"
```

--wrap=preserve
html の wrap に従う

## Dockerimage

```yml
FROM pandoc/core
```
