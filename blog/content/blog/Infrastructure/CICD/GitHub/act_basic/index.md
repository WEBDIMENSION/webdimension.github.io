---
title: "act 基本コマンド"
date: "2022-02-22 22:50:11"
post_modified: "2022-02-22 22:50:11"
description: "GitHub Actions を Localで実行"
categories: ["Infrastructure"]
tags: ["GitHub Actions", "act", "CI/CD"]
draft: false
---

## workflow 一覧

```bash
act -l <triger> push, pull_request, more...
```

## Dry run

```bash
act pull_request -n
```

## -Verbose

```bash
act push -v
```

## Exec

```bash
act pull_request
```

```bash
act push
```
