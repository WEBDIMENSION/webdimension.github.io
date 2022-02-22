---
title: "SELinux を OFF にする"
date: "2022-02-23 04:02:44"
post_modified: "2022-02-23 04:02:44"
description: "場合よって SELinux を OFF"
categories: ["Infrastructure"]
tags: ["CentOS7", "SELinux", "Security"]
draft: false
---

## Display current status

```bash
getenforce
```

```bash
enforcing or Perissive or Disabled
```

## Change status

```bash
setenforce Enforcing or Permissive
```

## Permanentive settig

```bash
vi /etc/selinux/config

#SELINUX=enforcing
SELINUX=disabled
```

```bash
sudo reboot
```

## Confirm

```bash
ls -lZ /var/www
drwxr-xr-x root root     cgi-bin
drwxr-xr-x  501 games    html
drwxr-xr-x root apache   phpMyAdmin
```
