---
title: "パスワード生成に便利なツール 'pwgen'"
date: "2019-11-02 23:12:36"
post_modified: "2019-11-02 23:14:00"
description: "複雑なパスワードをコマンド一発で生成"
categories: ["Tools"]
tags: ["Command", "Security"]
draft: false
---

# パスワード生成に便利なツール 'pwgen'

パスワード生成には

- 大文字
- 小文字
- 数字
- 記号

混じりで 8 桁以上とか、とにかく[めんどくさい]{.under_line}ので簡単に生成してくれる 'pwgen' が便利です。

## pwgen Install

```bash
# brew
brew install pwgen

#apt
apt-get install pwgen

#yum
yum install pwgen
```

よく使うやつ

```bash
○ → pwgen -y 16 1
niey2Wienah6ca~k
```

第一引数

- -y 記号を含める
- -0 数字を含めない
- -A 大文字を含めない

第二引数

- パスワードの桁数

第三引数

- 生成するパスワード数
