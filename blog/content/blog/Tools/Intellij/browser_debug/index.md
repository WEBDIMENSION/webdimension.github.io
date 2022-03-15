---
title: "Intellij IDEA ブラウザデバッグの際のブラウザの設定"  
date: "2022-03-15 04:15:28"  
post_modified: "2022-03-15 04:15:28"  
description: "Intellij IDEA でデバッグ用のブラウザ指定時 profile (user dir) の設定"  
categories: ["Tools"]  
tags: ["Intellij IDEA", "開発環境"]  
draft: false
---


`http://localhost:8000`などで動いているWEBアプリをブラウザデバッグする際デフォルト設定では クリーンな(Add ON なし、インストールしたてのような)`Chrome`が立ち上がる。

できるならば日常使っている設定のままデバッグが立ち上がってほしい。

`Run/Debug設定` -> `Browser` 下記の箇所の **user data directory** を 指定する。

![Intellij IDEA ブラウザデバッグ](./images/intellij_idea_browser_debug.png)

Macの場合

``` bash
# Bliskの場合
~/Library/Application Support/Blisk
```

``` bash
# Chromeの場合
~/Library/Application Support/google/chrome
```

一度デバッグを停止し他のブラウザのとSessionを断ち再度デバッグ <kbd>ctl</kbd> + <kbd>D</kbd> で通常の設定のままのブラウザが起動する。