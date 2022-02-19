---
title: "Laravel DB　命名規則"
date: "2020-12-15 12:08:38"
post_modified: "2020-12-15 12:13:31"
description: "Laravel (他のFWも？ ) Tabele名、カラム名のやっとくと楽できるお作法"
categories: ["Programing"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel DB 　命名規則

f#(というか FrameWork 全般)

下記だと便利に振る舞ってくれる。

- TABLE 名：複数形
- MODEL：単数形
- PRIMARY KEY: ID
- FOREIGN KEY: TABLE 名の単数形

### 例外時

```php
# table name
class Car extends Model
{
    // Default is cars table.
    // set any name
    protected $table = 'anything';

    // Default is 'id'.
    // set any name
    protected $primaryKey = 'ether_id';
}
```
