---
title: "PHP UnitTest - Laravelでの開発の前準備4"
date: "2020-02-15 17:11:36"
post_modified: "2020-02-15 18:29:30"
description: "Laravelデフォルトのphpunitを実行。composer.json へスクリプト登録"
categories: ["BackEnd"]
tags: ["PHPUnit", "Laravel"]
topics: "laravel"
topic_order: "4"
draft: false
---

# PHP UnitTest - Laravel での開発の前準備 4

## phpunit を実行してみる

Laravel にはデフォルトで Test が導入されている。 実行してみる

```bash
 ./vendor/bin/phpunit
```

```bash
Time: 669 ms, Memory: 22.00 MB

OK (1 tests, 1 assertions)
```

このように OK がでれば テスト成功

### composer.json の script に追加

```bash
    "scripts": {
        ...
        ...
        ...
        ...
        "test": [
            "./vendor/bin/phpunit"
        ]
        ...
        ...
        ...
```

```bash
composer test
```

で実行できるようになる。

### IDE から Testunit 実行

参考:[Docker on Vagrant をがんばってみた](/blog/Environment/docke-on-vagrant/)

この例では Vagrant 上の Docker で動いている PHP をテストしています。
