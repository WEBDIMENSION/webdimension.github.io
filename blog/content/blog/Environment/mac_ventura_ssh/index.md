---
title: "MacOS を Ventura にアップグレードしたらSSH接続できない"  
date: "2022-11-09 09:53:06"  
post_modified: "2022-11-09 09:53:06"  
description: "MacOS を Ventura にアップグレードしたらSSH接続できない。./ssh/config で対応"  
categories: ["Environment"]  
tags: ["MAC", "SSH"]  
draft: false
---

MacOS を Ventura にアップグレードしたらSSH接続できなくなった。   
すべてのサーバーではない。   
どうやら`CentOS6` など古いサーバーへの接続において

```bash
Unable to negotiate with xxx.xxx.xxx.xxx port 22: no matching host key type found. Their offer: ssh-rsa,ssh-dss
```

のようなエラーで接続できない。

解決策として `~/.ssh/config` の冒頭に

```txt
HostKeyAlgorithms=+ssh-rsa
PubkeyAcceptedAlgorithms=+ssh-rsa
```

を追記して解決。

本来は host ごとに

```txt
host CentOS6
StrictHostKeyChecking no
HostName xxx.xxx.xxx.xxx
User hoge
Port 22
IdentityFile ~/.ssh/id_rsa
HostKeyAlgorithms=+ssh-rsa
PubkeyAcceptedAlgorithms=+ssh-rsa
```

にするのが好ましいのだけど面倒なので冒頭に追記して解決。

参考サイト

- [SSHをバージョンアップしたら接続出来なくなった](https://scribble.washo3.com/openssh88-disable-rsa.html)

ありがとうございます。
