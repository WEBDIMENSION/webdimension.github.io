---
title: "Postgres 基本コマンド"
date: "2022-02-23 00:07:53"
post_modified: "2022-02-23 00:07:53"
description: "Postgres よく使うコマンド これ覚えとけばなんとかなるかな"
categories: ["BackEnd"]
tags: ["Database", "Postgres"]
draft: false
---

## Create Role

```sql
CREATE ROLE name [ WITH ] LOGIN PASSWORD 'password'
-- Example
create role saru with login password 'monkey';
```

## Create SCHEMA

```sql
CREATE SCHEMA schema_name
```

## Create table

```sql
CREATE TABLE test
(
    a int PRIMARY KEY,
    b int,
    c int
);
```

```sql
create table test
(
    a int,
    b int,
    c int,
    constraint pk_test primary key (
     a
     )
);
```

## Create tmp table

```sql
CREATE TEMP TABLE temp_sample1 ( i int);
```

## Drop primary key

```sql
ALTER TABLE test
    DROP CONSTRAINT pk_test;
```

```sql
-- 主キーを作成するときに自分で名前を付けていなければ、テーブル名_pkeyでOK
ALTER TABLE test
    DROP CONSTRAINT test_pkey;
```

## Drop NOT NULL

```sql
ALTER TABLE test ALTER COLUMN a DROP NOT NULL;
```

## Add primary key

```sql
ALTER TABLE test ADD CONSTRAINT test_pkey PRIMARY KEY(a, b);
```

## メタコマンド

### ユーザ一覧を表示

```bash
postgres=# \du
```

### データベース一覧を表示

```bash
postgres=# \l
```

### 接続中のデータベースの情報を表示

```bash
postgres=# \conninfo
```

### テーブル一覧を表示

```bash
postgres=# \z
```

### テーブル定義を確認

```bash
postgres=# \d tablename
```

### カレントディレクトリ変更

```bash
postgres=# \cd directory
```

### CSV 形式のファイルをテーブルに挿入

```bash
postgres=# \copy tablename from filename DELIMITER AS ','
```

```bash
postgres=# \copy TABLE_NAME from 'CSV_FILE_NAME.csv' (format csv, header false, encoding utf8);
```

### ファイルからコマンドを実行

```bash
postgres=# \i filename.sql
```

### シェル上のコマンドを使いたい場合

```bash
postgres=# \! command
```

### ベントリスト表示

```bash
postgres=# \dy
```

### 関数リスト表示

```bash
postgres=# \df
```

### インデックスリスト表示

```bash
postgres=# \di
```

### スキーマリスト表示

```bash
postgres=# \dn
```

### 全スキーマのテーブルをリスト表示

```bash
postgres=# \dt *.*
```

### 全データ型をリスト表示

```bash
postgres=# \dT+
```

### viewをリスト表示

```bash
postgres=# \dv
```

## パーティショニング

***親テーブル***

```sql
create table zenkoku_chiho_kokyodantai_code (
     dantai_code     varchar(6)
    ,todofuken_kanji varchar(4)
    ,shichoson_kanji varchar(10)
    ,todofuken_kana  varchar(30)
    ,shichoson_kana  varchar(30)
)
partition by list (todofuken_kanji)
;
```

### パティションテーブル作成

```sql
create table zenkoku_chiho_kokyodantai_code_1  partition of zenkoku_chiho_kokyodantai_code for values in ('北海道');
create table zenkoku_chiho_kokyodantai_code_2  partition of zenkoku_chiho_kokyodantai_code for values in ('青森県');
create table zenkoku_chiho_kokyodantai_code_3  partition of zenkoku_chiho_kokyodantai_code for values in ('岩手県');
```

## 実行計画

```sql
EXPLAIN
sql文
--------------------------------------------
Seq Scan on <table_name>  (cost=0.00..1.60 rows=60 width=28)
```

- **Scan**
  - **Index Scan** Index を使った実行
  - **Seq Scan** フルスキャン
- **cost** 指標 相対的に評価する
- **rows** 実際の操作行数
- **width** 取得される行の平均サイズ
