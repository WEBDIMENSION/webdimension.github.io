---
title: "Laravel Eloquent 備忘録"
date: "2020-12-15 12:25:40"
post_modified: "2020-12-15 12:25:40"
description: "Laravel Eloquent の概要メモ"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel Eloquent 備忘録

## laravel Eloquent

_Example_

```php
class Article extends Model
{
    public $timestamps = true;
    protected $guarded = [
        'id'
    ];

    public function articleImages()
    {
        return $this->hasMany('App\Models\Admin\ArticleImage')->orderBy('sort', 'asc');
        // 1:n order by
    }

    public function project()
    {
        return $this->belongsTo('App\Models\Admin\Project')->withTrashed();
        // n:n  論理削除を含める
    }
}
```

- \$this-\>hasOne 1:1
- \$this-\>hasMany 1:N
- \$this-\>belongsTo N:1
- this-\>belognsToMany N:N
- \$this-\>hasManyThrough 中間テーブル

### sql 確認

```php
$sql = User::where('status', '<>', 1)
            ->toSql();
var_dump($sql);
```
