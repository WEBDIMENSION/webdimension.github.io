---
title: "Laravel Filable or Gurd"
date: "2020-12-15 12:53:19"
post_modified: "2020-12-15 12:53:19"
description: "カラム指定でDataの保護。意図しない変更を防ぐ"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

## Laravel Filable or Gurd

In Model\
ホワイトリストかブラックリストか、みたいなもの。。。

### Fillable

```php
// これらが変更可能
    protected $fillable = [
        'email',
        'pass',
        'name',
        'kana',
        'company',
        'stat',
        'dept',
        'sales_flg',
    ];
```

### Gurd

```php
// これらが変更禁止
protected $guarded = [
        'id',
        'email',
        'password'
    ];
```
