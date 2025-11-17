---
title: "WindowにMacのUSキーボードを外付けした時の日本語入力"
date: "2025-11-17 01:34:30"
post_modified: "2025-11-17 01:34:30"
description: "WindowにMacのUSキーボードを外付けした時の日本語入力、autohotkey利用"
categories: ["Tools"]
tags: ["MAC", "Windows", "AutoHotKey"]
draft: false
---

## WndowsでもMACのUSキーボード使いたい時の日本語入力の設定   

Windows側に*AutoHotKey*をインストールしておく

設定は

```txt
/*** Windows ***/
LWin::Send "{vk1D}"
RWin::Send "{vk1C}"
```

- 右cmd -> 日本語
- 左cmd -> 英数

となる。
便利な*AutoHotKey*
