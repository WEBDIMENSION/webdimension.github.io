---
title: "OpenAPI redocly"
date: "2025-11-17 14:26:57"
post_modified: "2025-11-17 14:26:57"
description: "OpenAPI redockry がみやすくてよい"
categories: ["BackEnd"]
tags: ["API", "redocly"]
topics: ""
draft: false
---

## OpenAPI をブラウザ表示

*openapi.yaml* を内容を確認する方法として *swagger-ui* がある

ほかにもいるいるありそうだけど *redocly* というツールがよさげ。

ただただ見た目がよい。

*swagger-ui* のメリットとしてはブラウザで開きブラウザからエンドポイントにアクセスできたりする。

でもブラウザからエンドポンとは叩かない。もっと見た目重視でとなれば *resocly* 一択かな。

仕事でも最近は *swagger-ui* よりも *resocly* を目にすることが多くなった。

なので *resocly* を Docker で動かすShellScritpを。。。

例) redockry

```bash
#!/usr/bin/env bash

######################################################
# redoc を html アプトプット 引数にアウトプットのファイル名
######################################################
docker run --name redocHtml --rm \
 -v "$PWD"/:/spec \
-p 8080:80 \
 redocly/cli build-docs /spec/openapi.yaml \
 -o /spec/"$1"
```

openai.yaml のあるディレクトリに移動して `redocly`

`http://localhost:8080` で確認できるはず。