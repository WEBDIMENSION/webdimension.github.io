---
title: "Laravel よく使うCache系のコマンド"
date: "2020-12-15 12:04:49"
post_modified: "2020-12-15 12:04:49"
description: "Laravelで開発中、変更分が反映されないときによく使うキャッシュクリア"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel よく使う Cache 系のコマンド

## Laravel cache clear

```bash
# Seed時 class 生成後
composer dump-autoload

#  Cache Basic clear
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
composer dump-autoload

# Deep
composer dump-autoload
php artisan clear-compiled
php artisan optimize
php artisan config:cache
```
