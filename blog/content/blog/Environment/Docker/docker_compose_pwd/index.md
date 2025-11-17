---
title: "docker-compose.yml では ${PWD} は使わない方がよい。"
date: "2025-11-17 12:58:07"
post_modified: "2025-11-17 12:58:07"
description: "docker-compose.yml でのl ${PWD} windows は動かない"
categories: ["Environment"]
tags: ["Docker-compose", "Docker"]
draft: false
---

##  docker-compose.yml での ${PWD} の使用はやめた方がよい。


```yaml
 volumes:
   - ${PWD}/../public:/usr/share/nginx/html/corporate/public
   - ${PWD}/php/php.ini:/usr/local/etc/php/php.ini
```

今まではこんな感じでパスを指定していた。

が、・・・・・

windows では ${PWD} は認識せず、期待通りに動かない。

今までは linux, mac 環境でしか試していなかったので気づけなかった。

```yaml
 volumes:
   - ./../public:/usr/share/nginx/html/corporate/public
   - ./php/php.ini:/usr/local/etc/php/php.ini
```

のように相対パスを書いた方が良さそう。