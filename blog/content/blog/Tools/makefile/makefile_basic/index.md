---
title: "makefile"
date: "2022-02-23 04:32:54"
post_modified: "2022-02-23 04:32:54"
description: "makefile 邪道な使い方"
categories: ["Tools"]
tags: ["Makefile"]
draft: false
---

## Makefile

### Exec

```bash
make docker-compose_ps
```

```bash
docker-compose_ps:
 @$(call _docker_compose, 'ps')
```

### include

```bash
include ./.makefile.d/*.mk
```

### variable

```bash
  FOO := foo
```

```bash
BAR = $(shell date)
```

```bash
  FOO := foo
```

### define

Current DIR

```bash
  echo $(PWD)
```

### Shell

```bash
MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
```

### Function

```bash
define _docker_compose
 cd $(PARENT_DIR) && docker-compose $1 $2
endef
```

```bash
docker-compose_ps:
 @$(call _docker_compose, 'ps')
```

### Directory

```bash
# Current Dir
MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
```

```bash
# 1 up Dir
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})
```
