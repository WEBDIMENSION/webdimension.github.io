---
title: "WordPressでGitを使ったWebhookデプロイとリモートDB同期"
date: "2019-09-23 17:29:23"
post_modified: "2019-09-23 19:40:32"
description: "リモートのDBをローカルへ同期するめんどくさい作業をスクリプト化"
categories: ["BackEnd"]
tags: ["MySQL", "Wordpress", "ShellScript"]
draft: false
---

## WordPress で Git を使った Webhook デプロイとリモート DB 同期

ここでの**Git**の使い方はあくまで"1 人\_Git"、"オレオレ Git"なのでチームでの Git の使い方には参考にはなりません。

Git リポジトリーへ Push し自動デプロイはよくありますが Git を利用して本番サーバーの
**DB をローカルへ同期** するスクリプトを組んでみます。

## よくある Webhook による自動デプロイ

### GitLab の Webhook をトリガーに"Git pull"し、Slack へ通知するスクリプト配置

サーバー上の任意の場所へ設置。

```php
<?php
//Git deploy
define('GIT_ROOT_DIR','../../'); // Project root
define('GIT_BRANCH','master'); // master , develop ....
define('GIT_TOKEN','token');  // your token
define('GIT_TOKEN_NAME','X-Gitlab-Token');
$slack_urls = array(
    // Slack URL
 'https://hooks.slack.com/services/xxxxxxxx/xxxxxxx/xxxxx'
);

$json_string = file_get_contents('php://input');
$json = json_decode($json_string, true);
$header = getallheaders();
//if ($header[GIT_TOKEN_NAME] !== GIT_TOKEN) {
// echo 'exit';
////    if(false) {
// exit();
//}
 $command = "cd " . GIT_ROOT_DIR ." && git fetch origin master && git reset --hard origin/".GIT_BRANCH;
exec($command, $out, $return_ver);

if (sizeof($slack_urls) > 0) {
 $result_mess = '';
 if ($return_ver === 0) {
    //Deploy Success
    $emoji = ":smile:";
    $color = 'good';
    $result_test = "Deploy Sucess";
 } else {
    //Deploy Failed
    $emoji = ":scream:";
    $color = 'danger';
    $result_test = "Deploy Failed";
    $result_test .= "   ".date("Y/m/d H:i:s");
    foreach ($out as $key => $value) {
     $result_mess .= $value . "n";
    }
 }
 $payload = '
 {
 "username": "",
   "attachments":[
      {
         "fallback":"Deploy",
         "pretext":"Deploy '. GIT_REPO . ' '.GIT_BRANCH.'",
         "color":"'.$color.'",
         "fields":[
            {
               "title":"' . $emoji . $result_test . '",
               "value":"' . $result_mess .'"
            }
         ]
      }
   ]
} ';

 foreach ($slack_urls as $slack_url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $slack_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    $res = curl_exec($ch);
//  var_dump($res);
    curl_close($ch);
 }
}
```

### GitLab のインテグレーション設定

GitLab-\>設定-\>インテグレーション

![image](images/gitlab-webhook.png)

"Git push"する度に自動デプロイされる。

## リモートの MYSQL をローカルへ同期

### リモートに MySQL をバックアップし"git commit","git push"するスクリプトを設置

Git の管理内で公開ディレクトリでない場所に設置するのが望ましいかと思います。 実行権限も忘れずに。\
mysql-sync.sh (仮)

```bash
#!/usr/local/bin/bash
SQLHOST= ホスト名
SQLUSER= ユーザー名
SQLPASSWORD= パスワード
SQLTARGETDB= DB名

// ファイル名
SQL_FILE_NAME=db.sql
// 圧縮後のファイル名
SQL_ZIP_FILE_NAME=data/db.zip
// Zipパスワード
SQL_ZIP_PASS= パスワード

// mysqldump のPath
MYSQLDUMP_PATH=/usr/local/bin/mysqldump

// MySQLログインのためのテンポラリー my.cnf
MYCNF=${HOME}/.my.cnf
MYCNFCREATE() {
cat << _EOL_ | tee ${MYCNF}
[client]
host=${SQLHOST}
user=${SQLUSER}
password="${SQLPASSWORD}"
[mysqldump]
host=${SQLHOST}
user=${SQLUSER}
password="${SQLPASSWORD}"
_EOL_
}

if [ ! -f ${MYCNF} ];
then
 MYCNFCREATE
else
 mv ${MYCNF} ${MYCNF}_$(date +%Y%m%d%H%M%S)
 MYCNFCREATE
fi

// バックアップ
$MYSQLDUMP_PATH $SQLTARGETDB > $SQL_FILE_NAME
// テンポラリー my.cnf 削除
rm -rf ${MYCNF} ${MYCNF}_$(date +%Y%m%d%H%M%S)

// パスワード付きでZip圧縮
zip -e --password=$SQL_ZIP_PASS $SQL_ZIP_FILE_NAME $SQL_FILE_NAME
// sqlファイルは削除
rm -rf $SQL_FILE_NAME

// Git pushまで
cd ../../
git add -A
git commit -m 'Sync From Deploy'
git push origin master
```

### MySQL 同期スクリプトをローカルに設置

SSH でのログインが必要です。鍵認証でのログインが設定済み前提です。(パスワード入力が[めんどくさい]{.under_line})

```bash
#!/bin/bash
# host別設定ファイル読み込み
source mysql.sync
    # sshにてlogin してmysqldumpを実行
    ssh -p $REMOTE_SSH_PORT $REMOTE_USER@$REMOTE_HOST $REMOTE_BACKUP_COMMAND

   git pull origin master
    # パスワード付きzipファイル解凍
    unzip -o -P $ARCIVE_PASS $DOWNLOAD_FILE -d $AFTER_ARCIVE_DIR

    # local MySQLログイン用ファイル読み込み
    LOGIN_FILE=./local_mysql_login.cnf
    # local mysqlログイン及びdumpファイル実行
    mysql --defaults-extra-file=$LOGIN_FILE $LOCAL_DB_NAME < $AFTER_ARCIVE_FILENAME
    # local設定を反映させるSQL実行
    mysql --defaults-extra-file=$LOGIN_FILE < $CHANGE_LOCAL_SQL_FILENAME

    rm $AFTER_ARCIVE_FILENAME
    rm $CHANGE_LOCAL_SQL_FILENAME
```

読み込んでいる mysql.sync

```bash
# SSH ログイン情報
REMOTE_HOST= ホスト名
REMOTE_USER　ユーザー名
REMOTE_SSH_PORT= ポート番号

# Root ディレクトリ
REMOTE_WP_ROOT=/home/xxx/www/xxxxx
# Remote backup path
REMOTE_BACKUP_EXE_DIR=$REMOTE_WP_ROOT/wp_sync/
# サーバー上に設定したスクリプトファイル名
REMOTE_BACKUP_EXE= mysql-sync.sh (仮)
# バックアップコマンド実行
REMOTE_BACKUP_COMMAND="cd $REMOTE_BACKUP_EXE_DIR; ./$REMOTE_BACKUP_EXE"

# ローカル ディレウトリ
LOCAL_PATH="/var/www/html/xxx/xxx"
DOWNLOAD_FILE=$LOCAL_PATH/wp_sync/data/db.zip
ARCIVE_PASS= Zipパスワード
AFTER_ARCIVE_DIR=$LOCAL_PATH/wp_sync/data
AFTER_ARCIVE_FILENAME=$AFTER_ARCIVE_DIR/db.sql

# local db name
LOCAL_DB_NAME= DB名

# 置換項目定数
## Domain
BEFORE_DOMAIN1="Before domain"
AFTER_DOMAIN1="After domain"

## Path
BEFORE_PATH="Before Path"
AFTER_PATH="After Path"
TABLE_PREFIX="wp_"

## Update用のSQL生成
CHANGE_LOCAL_SQL_FILENAME=change_local.sql
touch $CHANGE_LOCAL_SQL_FILENAME
cat <<EOF> $CHANGE_LOCAL_SQL_FILENAME
SET NAMES utf8;
use ${LOCAL_DB_NAME}

update ${TABLE_PREFIX}options set
option_value = REPLACE(option_value,'${BEFORE_DOMAIN1}','${AFTER_DOMAIN1}')
where option_value like "%${BEFORE_DOMAIN1}%";

update ${TABLE_PREFIX}posts set
post_content = REPLACE(post_content,'${BEFORE_DOMAIN1}','${AFTER_DOMAIN1}')
where post_content like "%${BEFORE_DOMAIN1}%";

update ${TABLE_PREFIX}posts set
post_content_filtered = REPLACE(post_content_filtered,'${BEFORE_DOMAIN1}','${AFTER_DOMAIN1}')
where post_content_filtered like "%${BEFORE_DOMAIN1}%";

update ${TABLE_PREFIX}posts set
guid = REPLACE(guid,'${BEFORE_DOMAIN1}','${AFTER_DOMAIN1}')
where guid like "%${BEFORE_DOMAIN1}%";

update ${TABLE_PREFIX}options set
option_value = REPLACE(option_value, '${BEFORE_PATH}','${AFTER_PATH}')
where option_value like "%${BEFORE_PATH}%";

update ${TABLE_PREFIX}postmeta set
meta_value = REPLACE(meta_value,'${BEFORE_DOMAIN1}','${AFTER_DOMAIN1}')
where meta_value like "%${BEFORE_DOMAIN1}%";
EOF
```

読み込んでいる ローカル MySQL ログイン用 local_mysql_login.cnf

```bash
[client]
user = root
password = ''
host = localhost
```

振る舞いとしては

1. ローカルから SSH でサーバーへログイン
2. サーバ側で MySQL バックアップ、"Git push"
3. ローカルで"Git pull"
4. Zip(sql ファイル、パスワード付き)を解凍
5. ローカル MySQL へインポート
6. 変更必要箇所(ドメイン、Path) を Update 処理

リモートの Database をローカルに同期するには手動でやると早くても数分はかかるでしょう。\
また手作業のためミスも起こる可能性も。\
このスクリプトでわずか数秒になりました。

数分の[めんどくさい]{.under_line}を解消するために 1 日かけるという本末転倒かもしれないが共有することによりブラッシュアップされ無駄ではなくなると信じることにしてる。\
自分のアイデアを形にすることはいい勉強にはなりますわね。
