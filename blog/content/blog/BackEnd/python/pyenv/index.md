---
title: "pyenv Install"
date: "2022-02-23 03:17:55"
post_modified: "2022-02-23 03:17:55"
description: "pyenv のインストール及び設定"
categories: ["BackEnd"]
tags: ["python", "開発環境"]
draft: false
---

## Install

```bash
pyenv install 3.7.7(version)
pyenv uninstall 3.7.7(version)
```

## pyenv-virtualenv

### install

```bash
# Install 可能 version のリスト
pyenv install --list
```

```bash
pyenv install x.x.x
pyenv virtualenv x.x.x EnvNama
pyenv local EnvNama
```

```bash
pyenv local 2.7.10
pyenv global 3.5.0
```

## uninstal

```bash
 pyenv uninstall EnvName
```
