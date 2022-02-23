---
title: "python 基本構文"
date: "2022-02-23 03:12:10"
post_modified: "2022-02-23 03:12:10"
description: "python 個人的メモ"
categories: ["BackEnd"]
tags: ["Python"]
draft: false
---

## 分岐

### if elif else

```python
if 条件式A:
    条件式Aが真（true）の場合に実行する処理
elif 条件式B:
    条件式Aが偽（false）で条件式Bが真（true）の場合に実行する処理
else:
    すべての条件式が偽（false）の場合に実行する処理
```

## replace

### 改行除去

`\n`, `\r` どちらも必要の場合あり

```python
def replace_nr(str):
    return str
    .replace('\n', '')
    .replace('\r', '')
    .replace('"', '')
```

## ファイル書き出し

```python
    f = open(output_path, 'w')
f.write(rendered_s)
f.close()
```

## 環境変数

```python
DB_HOST = os.getenv('MYSQL_IP')
DB_PORT = int(os.getenv('MYSQL_INTERNAL_PORT'))
DB_NAME = os.getenv('MYSQL_DATABASE')
DB_USER = os.getenv('MYSQL_USER')
DB_PASSWORD = os.getenv('MYSQL_PASSWORD')
DB_ROOT_PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD')
```
