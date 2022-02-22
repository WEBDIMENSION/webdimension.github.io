---
title: "Database Function 使用頻度高"
date: "2022-02-22 23:12:23"
post_modified: "2022-02-22 23:12:23"
description: "使用頻度が高い Database のFunction コピペ用"
categories: ["BackEnd"]
tags: ["Database", "MySQL", "Postgres"]
draft: false
---

## CASE

**SELECT 句**

```sql
SELECT name,
       address,
       CASE
           WHEN address = '東京都' THEM '関東'
           WHEN address = '福島県' THEM '東北'
           ELSE NULL
           END AS distrint
FROM Address
```

**WHERE 句**

```sql
SELECT key,
    name,
    date_1,
    flg_1,
    date_2,
    flg_2,
    date_3,
    flg_3
FROM ThreeElements
WHERE CASE
    WHEN date_1 = '2013-11-01' THEN flg_1
    WHEN date_2 = '2013-11-01' THEN flg_2
    WHEN date_3 = '2013-11-01' THEN flg_3
    ELSE NULL END = 'T'
;
```

**GROUP BY 句**

```sql
SELECT CASE
           WHEN age < 20 THEN '子供' !open -a IntelliJ\ IDEA %
           WHEN age BETWEEN 20 AND 69 THEN '成人'
           WHEN age >= 70 THEN '老人'
           ELSE NULL END AS age_class,
       COUNT(*)
FROM Persons
GROUP BY CASE
             WHEN age < 20 THEN '子供'
             WHEN age BETWEEN 20 AND 69 THEN '成人'
             WHEN age >= 70 THEN '老人'
             ELSE NULL END;
```

## INTERSECT

**共通するレコード**

```sql
SELECT *
FROM Address INTERSECT
SELECT *
FROM Address2;
```

## Expect

**Address にあって Address2 にないレコード**

```sql
SELECT *
FROM Address EXCEPT
SELECT *
FROM Address2;
```

## Rank

**age の降順(抜け番あり)**

```sql
SELECT name,
       age,
       RANK() OVER (ORDER BY age DESC) AS rnk
```

**age の降順(抜け番なし)**

```sql
SELECT name,
       age,
       DENSE_RANK() OVER (ORDER BY age DESC) AS rnk
```

## SUBSTRING

```sql
SELECT SUBSTRING(name, 1, 1) AS label,
       COUNT(*)
FROM Persons
GROUP BY SUBSTRING(name, 1, 1);
```

## ROWS BETWEEN

```sql
-- 1行前
SELECT company,
       year,
       sale,
       MAX(company)
           OVER (PARTITION BY company
               ORDER BY year
               ROWS BETWEEN 1 PRECEDING
                   AND 1 PRECEDING) AS pre_company,
       MAX(sale)
           OVER (PARTITION BY company
               ORDER BY year
               ROWS BETWEEN 1 PRECEDING
                   AND 1 PRECEDING) AS pre_sale
FROM Sales;
```

## WITH RECURSIVE

```sql
with recursive calculate_range(date_start, date_end) AS (
    select date '2021-01-01', date '2022-01-31'
    union all
    select date(date_start + interval '1 month'), date(date_start + interval '2 month' - interval '1 day')
    from calculate_range
    where date_start < '2022-01-01'
)
select calculate_range.*
from calculate_range
```
