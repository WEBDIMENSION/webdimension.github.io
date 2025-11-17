---
title: "サイト上のメールフォームなどからメールを送信する際の迷惑メール判定"
date: "2025-11-17 14:55:16"
post_modified: "2025-11-17 14:55:16"
description: "Gmailの迷惑メール判定に効果的だった設定"
categories: ["Infrastructure"]
tags: ["迷惑メール"]
topics: ""
draft: false
---


## Gmailの迷惑メール判定されないようにするために効果的だったもの

DNS設定

txt _dmarc.webdimension.jp v=DMARC1; p=none; rua=mailto:info@webdimension.jp

 Type | name | TTL | value |
| ---- | ---- | ---- | ---- |
| txt | _dmarc.FQDN |3600 | v=DMARC1; p=none; rua=mailto:メールアドレス | 