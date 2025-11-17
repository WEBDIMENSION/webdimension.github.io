---
title: "Wordpress のアップデートをsshで実行する"
date: "2025-11-17 12:35:30"
post_modified: "2025-11-17 12:35:30"
description: "WordpressのアップデートをFTP,SFTPではなくsshで行う設定"
categories: ["BackEnd"]
tags: ["Wordpress"]
draft: false
---

##  Wordpress のアップデートをsshで実行するための設定


[参考サイト](https://blog.capilano-fw.com/?p=3564)


 適当な場所に秘密鍵、公開鍵 のディレクトリを作成

``` bash
mkdir ~/.wp_ssh/
```

ssh 鍵作成

```bash
ssh-keygen -f ~/.wp_ssh/id_rsa
```

パスワード聞かれるがパスワードは設定したくないので何も入力せずにEnter

`wp-config.php` を編集

```injectablephp
/* SSH */                                                                                                                                                                                     
define('FS_METHOD', 'ssh2');                                                                                                                                                                  
define('FTP_PUBKEY', '<公開鍵の場所指定>');                                                                                                                        
define('FTP_PRIKEY', '<秘密鍵の場所指定>');                                                                                                                            
define('FTP_USER', '<USER_NAME>');                                                                                                                                                           
define('FTP_HOST', '127.0.0.1:22');        
```

> ssh 拡張機能が利用できません。

これが出た場合はサーバー側にインストールが必要

```bash
dnf install php-pecl-ssh2
```

権限変更

```bash
chmod 700 ~/.wp_ssh
chmod 600 ~/.wp_ssh/*
```

で、うまくいけた。