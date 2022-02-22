---
title: "iptables 基本コマンド"
date: "2022-02-23 04:16:44"
post_modified: "2022-02-23 04:16:44"
description: "よくつかう iptables のコマンド"
categories: ["Infrastructure"]
tags: ["iptables", "CentOS7", "Security"]
draft: false
---

## Display current setting

```bash
iptables -L
```

## Setting file

```bash
vi /etc/sysconfig/iptables

-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
```

```bash
# command
iptables -A INPUT -m tcp -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -m tcp -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -m tcp -p tcp --dport 443 -j ACCEPT

# after
iptables save
service iptables reload
```
