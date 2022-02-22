---
title: "MySQL 基本コマンド"
date: "2022-02-22 23:58:36"
post_modified: "2022-02-22 23:58:36"
description: "MySQL よく使うコマンド これ覚えとけばなんとかなるかな"
categories: ["BackEnd"]
tags: ["Database", "MySQL"]
draft: false
---

## Create table

```sql
CREATE TABLE dogs
(
    id       INT(11) AUTO_INCREMENT NOT NULL,
    name     VARCHAR(30) NOT NULL,
    owner_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);
```

## Create tmp table

```sql
CREATE
TEMPORARY TABLE tmp_t1 (
id INT,
name varchar(256)
);
```

## Drop primary key

```sql
ALTER TABLE テーブル名 DROP PRIMARY KEY;
```

## Drop NOT NULL

```sql
ALTER TABLE test
    ALTER COLUMN a DROP NOT NULL;
```

## Add primary key

```sql
ALTER TABLE tab1
    ADD PRIMARY KEY (emp_id);
ALTER TABLE tab1
    ADD PRIMARY KEY (emp_id, emp_name);
```

## Mod primary key

```sql
ALTER TABLE テーブル名 DROP PRIMARY KEY,ADD PRIMARY KEY (カラム名);
```

## Dump

| optin | mean                             | description                                                                     |
| ----- | -------------------------------- | ------------------------------------------------------------------------------- |
| -u    | ユーザー名(user)                 | サーバに接続するユーザー名                                                      |
| -p    | パスワード(password)             | パスワードを指定してログイン                                                    |
| -h    | ホスト名(host)                   | 接続するサーバのホスト名(ex. localhost, 127.0.0.1)指定しないと localhost になる |
| -B    | データベース(dababase)           | 複数のデータベースを名前を指定してダンプ                                        |
| -A    | すべてのデータベース(all)        | 複数のデータベースをまとめてダンプ                                              |
| -d    | 定義のみ(no-data)                | 定義のみダンプを取りたいときに指定                                              |
| -n    | データベースは無視(no-create-db) | データベースを作成せずにダンプ                                                  |
| -t    | テーブルは無視(no-create-info)   | テーブルの作成を行わずにダンプ                                                  |

| option                              | mean                                                                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --single-transaction                | ダンプを行う前に BEGIN ステートメントを発行する。内部的にスナップショットを取ってダンプを行うので、DB をロックせずに整合性の取れたダンプを取ることが可能 |
| --quick                             | テーブルの全レコードをメモリにバッファせずに、1 行ずつダンプを行う。データ量の大きいテーブルのダンプ時にメモリを逼迫せずにダンプを行える。               |
| --opt                               | --add-drop-table --add-locks --create-options --disable-keys --extended-insert --lock-tables --quick --set-charset の短縮形。                            |
| --add-drop-table                    | CREATE TABLE の前に DROP TABLE を含める                                                                                                                  |
| --add-locks                         | 各テーブルの INSERT 前後に LOCK_TABLE 文と UNLOCK_TABLE 分を含めることで INSERT 速度が向上する                                                           |
| --create-options                    | MySQL に固有なテーブルオプションを CREATE TABLE に含める                                                                                                 |
| --disable-keys                      | 各テーブルで、全てのレコードのインポートが完了するまでインデックスを作らないようにする                                                                   |
| --extended-insert                   | １つの INSERT 文で複数の VALUE を構文を利用する。これにより、ダンプで出力されるファイルサイズが減り、インポート時間も短縮される                          |
| --lock-tables                       | テーブルをダンプする前にロックする                                                                                                                       |
| --set-charset                       | SET NAMES default_character_set を出力に追加する                                                                                                         |
| --lock-all-tables                   | データベース内のテーブル全てをロックする                                                                                                                 |
| --master-data                       | バイナリログファイルの名前と場所を出力に含める。--single-transaction が指定されてない場合は、--lock-all-tables が有効になる。                            |
| --ignore-table=[DB 名].[テーブル名] | 指定されたテーブルをダンプしない                                                                                                                         |

### 定義とデータのダンプ

```sql
--  database
mysqldump -u USER_NAME -p -h HOST_NAME DB_NAME > OUTPUT_FILE_NAME
-- table
mysqldump -u USER_NAME -p -h HOST_NAME DB_NAME TABLE_NAME > OUTPUT_FILE_NAM
-- テーブルの定義とデータのダンプ
mysqldump -u USER_NAME -p -h HOST_NAME -A -n > OUTPUT_FILE_NAME
```

### 全てのデータベース・テーブルのダンプ(定義とデータ)

```sql
--　データベース
mysqldump
-u USER_NAME -p -h HOST_NAME -A > OUTPUT_FILE_NAME
-- テーブル（データベースを１つ選んでダンプ）
mysqldump -u USER_NAME -p -h HOST_NAME DB_NAME > OUTPUT_FILE_NAME
```

### 定義のみダンプ

```sql
-- データベースとテーブル定義をダンプ
mysqldump
-u USER_NAME -p -h HOST_NAME DB_NAME -d > OUTPUT_FILE_NAME
-- データベースの定義のみダンプ
mysqldump -u USER_NAME -p -h HOST_NAME DB_NAME -d -t > OUTPUT_FILE_NAME
-- テーブルの定義のみダンプ
mysqldump -u USER_NAME -p -h HOST_NAME DB_NAME -d -n > OUTPUT_FILE_NAME
```

### Restore

```sql
-- 出力されたスクリプトファイルの実行
mysql -u USER_NAME -p -h HOST_NAME DB_NAME < OUTPUT_FILE_NAM
```

## 基本コマンド

### ユーザ一覧を表示

```sql
SELECT *
FROM mysql.user;
```

### データベース一覧を表示

```sql
show
databases;
```

### 接続中のデータベースの情報を表示

```sql
select *
from INFORMATION_SCHEMA.SCHEMATA
where SCHEMA_NAME = '<table_name>'
```

### テーブル一覧を表示

```sql
show
tables;
```

### テーブル定義を確認

```sql
SHOW
CREATE TABLE <tabe_name>;
```

### データディレクトリ確認

```bash
select @@datadir;
```

### CSV 形式のファイルをテーブルに挿入

```bash
LOAD DATA LOCAL INFILE "ファイル名"
INTO TABLE テーブル名
FIELDS TERMINATED BY '区切り文字'
OPTIONALLY ENCLOSED BY '囲み文字';

load data local infile "<file_path> " into table <table_name> fields terminated by ',' optionally enclosed by '"';

```

### CSV 形式のファイルをエクスポート

```bash
SELECT フィールド名 FROM テーブル名 INTO OUTFILE’出力したいファイル名’ FIELDS TERMINATED BY '区切り文字' OPTIONALLY ENCLOSED BY '囲み文字';

SELECT * FROM <table_name>
INTO OUTFILE '<file_path>'
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"';
```

### ファイルからコマンドを実行

```bash
# SHellから
mysql -uroot -p < create_user.dd
#  login後
source createDB.ddl
```

### インデックスリスト表示

```bash
show index from <table_name>;
```

## パーティショニング

### RANGE パーティショニング

```sql
CREATE TABLE t1
(
    id   int  NOT NULL,
    days DATE NOT NULL
) PARTITION BY RANGE (id) (
    PARTITION p0 VALUES LESS THAN (3),
    PARTITION p1 VALUES LESS THAN (5),
    PARTITION p2 VALUES LESS THAN (10),
    PARTITION p3 VALUES LESS THAN (15)
);
```

### LIST パーティショニング

```sql
CREATE TABLE t2
(
    id   int(2),
    days date
) ENGINE=InnoDB
    PARTITION BY LIST(id)(
    PARTITION p1 VALUES IN (1,2),
    PARTITION p2 VALUES IN (3,4,5),
    PARTITION p3 VALUES IN (6,7,8,9,10),
    PARTITION p4 VALUES IN (11,15)
    );
```

### HASH パーティショニング

```sql
CREATE TABLE t3
(
    id   int(2),
    days date
) ENGINE=InnoDB
    PARTITION BY HASH(id)
    PARTITIONS 10;
;
```

### KEY パーティショニング

```sql
CREATE TABLE t4
(
    id   int(2) PRIMARY KEY,
    days date
) ENGINE=InnoDB
    PARTITION BY KEY()
    PARTITIONS 10;
;
```

#### example

```sql
CREATE TABLE `t1`
(
    `id`   int(11),
    `days` date
) ENGINE=InnoDB
    PARTITION BY RANGE (year(days))
PARTITION p0 VALUES LESS THAN (1900) ENGINE = InnoDB,
 PARTITION p1 VALUES LESS THAN (1950) ENGINE = InnoDB,
 PARTITION p2 VALUES LESS THAN (2000) ENGINE = InnoDB,
 PARTITION p3 VALUES LESS THAN (2050) ENGINE = InnoDB)
;
```

#### 設定の確認

```sql
SELECT TABLE_SCHEMA, TABLE_NAME, PARTITION_NAME, PARTITION_ORDINAL_POSITION, TABLE_ROWS
FROM INFORMATION_SCHEMA.PARTITIONS
WHERE TABLE_NAME = '<table_name>';
```

#### パーティションの削除

```sql
ALTER TABLE < table + name > DROP PARTITION < partition name >;
```

#### パーティションを戻す

```sql
ALTER TABLE < table_name > REMOVE PARTITIONING;
```

### パーティション追加

```sql
ALTER TABLE < table_name > ADD PARTITION (
    PARTITION p202201 VALUES LESS THAN TO_DAYS('2022/02/01 00:00:00'))
    );
```

### 外部キー

```sql
FOREIGN KEY (`usersId`) REFERENCES users(`id`)
```

- innodb であること
- primary-key であること

```sql
--  Options
[ON DELETE
reference_option]
[ON
UPDATE reference_option]
```

#### reference_option:

RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT

- RESTRICT  
  親テーブルに対して削除または更新を行うとエラーとなります。設定を省略した場合は RESTRICT を設定したのと同じです。

- CASCADE  
  親テーブルに対して削除または更新を行うと、子テーブルで同じ値を持つカラムのデータに対して削除または更新を行います。

- SET NULL  
  親テーブルに対して削除または更新を行うと、子テーブルの同じ値を持つカラムの値が NULL になります。

- NO ACTION  
  親テーブルに対して削除または更新を行うとエラーとなります。 RESTRICT を設定した場合と同じです。

- SET DEFAULT  
  現在この設定を行うとテーブルの作成が行えません。

### Command line Login

```bash
MYCNF=$(cd $(dirname $0); pwd)/my.cnf
# function for create tmp my.cnf
MYCNFCREATE() {
cat << _EOL_ | tee ${MYCNF} >/dev/null
[client]
user=${MYSQL_USER}
password=${MYSQL_PASSWORD}
_EOL_
}
# my.confがあれば削除してtmp my.cnf 作成
if [ ! -f ${MYCNF} ];
then
 MYCNFCREATE
else
 rm -rf ${MYCNF}
 MYCNFCREATE
fi
mysql --defaults-extra-file=$MYCNF -D ${MYSQL_DATABASE} < ${MYSQL_SYNC_LOCAL_SAVE_PATH}/$1
```
