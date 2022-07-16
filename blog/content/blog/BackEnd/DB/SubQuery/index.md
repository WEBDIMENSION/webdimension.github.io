---
title: "Database SubQuery"
date: "2022-02-22 23:42:11"
post_modified: "2022-02-22 23:42:11"
description: "SubQueryの基本的パターン"
categories: ["BackEnd"]
tags: ["Database", "MySQL", "Postgres"]
draft: false
---

## 単一値 (スカラー)

### subQuery で update

```sql
update 家計簿集計
  set 平均 = ( select AVG (出金額)
  from 家計簿アーカイブ
  where 出金額 > 0
  and 費目 = '食費')
where 費目 = '食費'
```

### subQuery で select

```sql
select 日付, メモ, 出金額,
 (select 合計 from 家計簿集計
   where 費目 = '食費') as 過去の合計額
from 家計簿アーカイブ
where 費目 = '食費'
```

## 複数値 (ベクター)

### where In

```sql
select * from 家計簿集計
where 費目 IN (select Dictinct 費目 from 家計簿)
```

### where Any/Akl

```sql
select * from 家計簿
where 費目 = '食費'
  AND 出金額 < ANY (SELECT 出金額 FROM 家計簿アーカイブ
       WHERE 費目 = '食費')
```

***subQuery に NULL を含んでいると結果も NULL になる***

#### IS NOT NULL

```sql
SELECT * FROM 家計簿アーカイブ
 WHERE 費目 IN (SELECT 費目 FROM 家計簿
   WHERE 費目 IS NOT NULL)
```

#### COALESCE

```sql
SELECT * FROM 家計簿アーカイブ
 WHERE 費目 IN (SELECT COALESCE( 費目, '不明') FROM 家計簿)
```

## 表 (マトリックス)

### subQuery で FROM

```sql
SELECT SUM(SUB.出金額) AS 出勤合計
 FROM (
 SELECT 日付, 費目, 出金額
   FROM 家計簿
  UNION
 SELECT 日付, 費目, 出金額
   FROM 家計簿アーカイブ
 WHERE 日付 >= '2018-01-01'
        AND 日付 <= '2018-01-31'
 ) AS SUB
```

### subQuery で INSERT

```sql
INSERT INTO 家計簿集計 (費目, 合計, 平均, 回数)
SELECT 費目、SUM(出金額), AVG(出金額), 0
  FROM 家計簿
WHERE 出金額 > 0
GROUP BY 費目
```
