---
title: "Laravel Softdelete"
date: "2020-12-15 13:16:22"
post_modified: "2020-12-15 13:16:22"
description: "Laravel softdeleteの振る舞い"
categories: ["Programing"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel Softdelete

## model に追加

```php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use SoftDeletes;
}
```

## Softdelete されているか

```php
if ($user->trashed()) {
    // softdelete されている
}
```

## Softdelete されているデータも含めて取得

```php
$users = App\User::withTrashed()->get();
```

## Softdelete されているデータのみ取得

```php
$users = App\User::onlyTrashed()->get();
```

## Softdelete を復元

```php
$user->restore();
```

## 物理削除

```php
$user->forceDelete();
```
