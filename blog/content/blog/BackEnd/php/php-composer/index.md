---
title: "PHP Composer"
date: "2019-06-09 22:50:58"
post_modified: "2019-09-23 20:51:17"
description: "PHP のパッケージマネージャー Composer .その特徴とインストール"
categories: ["BackEnd"]
tags: ["PHP", "Composer"]
draft: false
---

# PHP Composer

## PHP Composer とは

_PHP のパッケージ管理ツール_ と呼ばれてます。\
Node.js や npm を使ったことある方にはなんとなくわかるでしょうか。\
Node.js の npm と似た扱いになります。\
Node.js では package.json に当たる部分が Composer では composer.json になります。

_なにがいいのかというと_

- ライブラリーを簡単にインストールできる
- ライブラリーの依存関係を解決してくれる
- composer.json の内容からパッケージをインストールするのでチームでの共有がしやすい。(プロジェクト進行中にパッケージの追加があっても composer.json を Git で共有すればよい)
- インストールされたパッケージは基本 Git の管理外なので Git-Repository
  に影響をあたえない。

と言われてます。

### Composer がない時代

経験談ですが・・・\
あるシステム(仮に EC サイト)に Pear ライブラリ から PearDB
をインストールしランキングを表示させるモジュールを作る。
サイト内でランキングを表示する。

その後

ランミング結果を xml 化し軽量化および外部配信を試みる 。\
_XML_Query2XML_\
という SQL の結果を簡単に xml ファイルへ変換してくれるライブラリーをインストール

それなりのスクリプトを組んで実行してみる。

PearDB には対応してません。　とエラーになる。\
いろいろググって Pear から MDB2 というライブラリは PearDB 　の後継だと知る。\
MDB2 をインストールおよび動作チェック。

もう[めんどくさい]{.under_line}

### Composer があると

composer.json に 必要なライブラリーを記述します。

```json
  "require": {
  "php": ">=5.5.9",
  "laravel/framework": "5.2.*",
   }
  "require-dev": {
  "phpunit/phpunit": "3.7.*"
  }
```

この記述例をもとに Repository からダウンロートしてくれます。
その時依存関係を解決を Composer が試みてくれます。

### Autoloader

```json
"autoload":
{
        "psr-4": {
            "myhoge\": "src/"
        }
    }
```

オートローダーはファイルを自動で読み込んでくれる仕組みです。

```php
 <?php
namespace myhoge;
class hoge {
 function hogehoge(){
   return true;
 }
  }
}
?>
```

ディレクトリ src を名前空間 ( namespace ) myhoge で読み込めます。

## PHP Composer を CentOS7 にインストール

以下 Root 権限　もしくは sudo

```bash
# php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

公式サイト推奨のインストール方法です。\
composer-setup.php のダウンロードをしてます。

```bash
# php composer-setup.php
```

composer の本体である composer.phar を作ります。

```bash
# php -r "unlink('composer-setup.php');"
```

composer.phar ができたのでダウンロードした omposer-setup.php を削除します。

```bash
# mv composer.phar /usr/local/bin/composer
```

composer をグローバルで使えるよう/usr/local/bin/ に配置してます。

```bash
# which composer
/usr/local/bin/composer
```

composer が配置されたか確認

```bash
# composer --version
Composer version 1.8.3 2019-01-30 08:31:33
```

Version 確認

これで Composer の準備が整いました。
