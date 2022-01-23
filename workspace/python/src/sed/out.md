\-\-- title: Docker Memo\
date: \'2020-12-15 13:36:11\'\
description: \"Docker系小ネタメモ。随時更新\"\
categories: \"\"\
tags: \"\"\
\-\--

# Docker Memo

## Docker ip　取得

Ansible でのtestの際に inventory_file にhostのIPを動的に書き込みたい

``` bash
docker inspect -f '{{ .NetworkSettings.IPAddress }}' <container>
```

## \'docker exec\' is not road env

``` bash
docke exec xxx
```

/etc/profile \~/.profile などは自動読み込まない。

``` bash
docke exec xxx bash
```

等でlogin後は環境変数が有効になる。

``` bash
docke exec xxx
```

で完結させたい場合は一手間必要。
