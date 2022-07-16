---
title: "sshでのログインを快適に"
date: "2019-11-02 23:11:21"
post_modified: "2019-11-06 19:26:54"
description: "sshでログインの際の手続きをちょっとのスクリプトで楽をする。記憶力とは戦わない。"
categories: ["Tools"]
tags: ["SSH", "ShellScript"]
draft: false
---

# ssh でのログインを快適に

ssh ログインをパスワード認証ではなく鍵認証にして \~/ssh/config に

```bash
host vagrant.local
HostName 192.168.33.11
User vagrant
Port 22
IdentityFile ~/.ssh/id_rsa
```

の様に設定を追加して

```bash
ssh vagrant.local
```

でログイン。

これはこれで大変便利なのですが、Host の数が多くなると Host 名を覚えるのが[めんどくさい]{.under_line}。 記憶力との戦いになる。戦わなくていい相手。

Host 一覧をプルダウンで表示させるスクリプトを考えてみた。
(チョー簡単な内容です)

```bash
 #!/bin/bash
# grep host ~/.ssh/config | awk '{print $2}'
ssh_dir=$HOME/.ssh
chmod 700  $ssh_dir
chmod 600 $ssh_dir/*
array=(grep ^host $ssh_dir/config | awk '{print $2}')
array_size=${#array[@]}
# echo "array size = $array_size"

n=0
while [ $n -lt $array_size ] ;do
     # eval echo "'['$n']'  ${array[$n]}"
      echo -e $'\e[96m' "[$n] ${array[$n]}"
    n=expr $n + 1
done

read -p $'\e[93mEnter Number:\e[0m' number
ssh  ${array[$number]}
```

を sshs (仮)で保存および実行権限付与。

\~/.ssh/config が下記の場合

```bash
host aaa.com
HostName 192.168.33.1
User vagrant
Port 22
IdentityFile ~/.ssh/id_rsa

host bbb.com
HostName 192.168.33.2
User vagrant
Port 22
IdentityFile ~/.ssh/id_rsa

host ccc.com
HostName 192.168.33.3
User vagrant
Port 22
IdentityFile ~/.ssh/id_rsa
```

sshs の実行

```bash
○ → sshs
 [0] aaa.com
 [1] bbb.com
 [2] ccc.com
Enter Number:
```

目的の Host の番号を入力しエンター。

たったこれだけですが非常に快適です。
