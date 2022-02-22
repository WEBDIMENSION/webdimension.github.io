---
title: "Database Transaction"
date: "2022-02-22 23:52:12"
post_modified: "2022-02-22 23:52:12"
description: "データの整合性に必要なTransactionの基本"
categories: ["BackEnd"]
tags: ["Database", "MySQL", "Postgres"]
draft: false
---

## Example

```sql
BEGIN;

INSERT INTO 家計簿アーカイブ
SELECT * FROM 家計簿 WHERE 日付 <= '2018-01-31';

DELETE FROM 家計簿 WHERE 日付 <= '2018-01-31';

COMMIT;
```

## 分離レベル

**デフォルトは READCOMMITTED**

| 分離レベル       | ダーティーリード | 反復不能読み取り | ファントムリード |
| ---------------- | ---------------- | ---------------- | ---------------- |
| READ UNCOMMITTED | 恐れアリ         | 恐れアリ         | 恐れアリ         |
| READ COMMITTED   | 発生しない       | 恐れアリ         | 恐れアリ         |
| REPEATABlLE READ | 発生しない       | 発生しない       | 恐れアリ         |
| SERAUZABLE       | 発生しない       | 発生しない       | 発生しない       |

## SELECT FOR UPDATE (行ロック)

```sql
BEGIN;
SELECT * FROM 家計簿
  WHERE 日付 >= '2018-02-01'
  FOR UPDATE;  -- 明示的ロック
-- 処理1
select ~
-- 処理2
select ~
-- 処理3
select ~
COMMIT; -- ロック開放
```

## LOCK TABLE (表ロック)

```sql
BEGIN;
LOCK TABLE 家計簿 IN EXCLUSIVE MODE; -- Table ロック
-- 処理1
select ~
-- 処理2
select ~
-- 処理3
select ~
COMMIT; -- ロック開放
```

## DeadLock 予防

- トランザクションの時間を短くする
- 同じ順番でロクする
