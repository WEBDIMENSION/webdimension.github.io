---
title: "python MySQl"
date: "2022-02-23 03:30:08"
post_modified: "2022-02-23 03:30:08"
description: "python から MySQL へ接続しデータを取得"
categories: ["BackEnd"]
tags: ["Python", "MySQL"]
draft: false
---

## mysqlclient

### Install

```txt
mysqlclient
```

### tuple で返す

```python
import MySQLdb

conn = MySQLdb.connect(user=DB_USER, passwd=DB_PASSWORD, host=DB_HOST, db=DB_NAME, port=DB_PORT)
cur = conn.cursor()
cur.execute("select * from users; ")
rows = cur.fetchall()
print(rows)
```

### dict で返す

```python
import MySQLdb
from MySQLdb.cursors import DictCursor

conn = MySQLdb.connect(user=DB_USER, passwd=DB_PASSWORD, host=DB_HOST, db=DB_NAME, port=DB_PORT)
cur = conn.cursor(DictCursor)
cur.execute("select * from users; ")
rows = cur.fetchall()
print(rows)
```
