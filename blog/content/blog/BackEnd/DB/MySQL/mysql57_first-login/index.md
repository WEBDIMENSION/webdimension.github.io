---
title: "MySQL5.7インストール後の初回ログイン"
date: "2019-09-23 14:41:36"
post_modified: "2019-09-23 19:42:19"
description: "MySQL5.7から初期アカウントが　root パスなし　ではなくなり一手間必要。"
categories: ["BackEnd"]
tags: ["MySQL"]
draft: false
---

# MySQL5.7 インストール後の初回ログイン

MySQL5.7 からは以前のバージョンに比べて[めんどくさい]{.under_line}ことになってます。

## MySQL5.7 インストール後の初回ログインは **必ず手順を忘れる** ので備忘録。

初期ログインアカウントは root\
初期パスワードはインストール時にログに吐き出されている。

```bash
$ sudo cat /var/log/mysqld.log
or
$ sudo cat /var/log/mysqld.log | grep password
```

この行。

```bash
temporary password is generated for root@localhost: 0h7ku9hSGM(4
```

初期パスワードでログイン後に新たにパスワードを設定。

```bash
mysql_secure_installation
```

初期パスワードを入力しあらためてパスワードを設定。\
大文字、小文字、数字、記号含む。\
以前のバージョンのようにパスワードを空でログインする場合は

```bash
sudo vi /etc/my.cnf
```

skip-grant-tables\
を追記します。
大文字、小文字、数字、記号ではなくもっとゆるくしたい場合

```bash
mysql -uroot -p
```

パスワード入力してログイン後

```bash
mysql> SET GLOBAL validate_password_length=4;
mysql> SET GLOBAL validate_password_policy=LOW;
```

いろいろと[めんどくさい]{.under_line}のでレベルは LOW、4 桁以上のパスワードを設定可能にします。

```bash
mysql> set password for root@localhost=password('root');
```

備考\
LOW : 桁数\
MEDIUM : 桁数、 数字、小文字/大文字、および特殊文字\
STRONG : 桁数、 数字、小文字/大文字、および特殊文字、辞書ファイル

今まで root パスなしだったのもどうなのよと思うこのごろです。
