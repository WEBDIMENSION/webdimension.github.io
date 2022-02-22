---
title: "Firewalld 基本コマンド"
date: "2022-02-23 04:10:31"
post_modified: "2022-02-23 04:10:31"
description: "よく使う Firewalld コマンド"
categories: ["Infrastructure"]
tags: ["Firewalld", "CentOs", "Security"]
draft: false
---

## Display firewall setting

```bash
firewall-cmd --list-all
sudo firewall-cmd --list-all-zones
```

## Active services

```bash
firewall-cmd --list-services
firewall-cmd --list-ports
```

## Add service

```bash
firewall-cmd --add-service= service.name
```

## Remove service

```bash
firewall-cmd --remove-service=service.name
```

## Reload

```bash
firewall-cmd --reload
```
