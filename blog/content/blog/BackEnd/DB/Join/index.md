---
title: "Database Table結合の基本"
date: "2022-02-22 23:32:50"
post_modified: "2022-02-22 23:32:50"
description: "'left join', 'right outer join' などの振る舞い"
categories: ["BackEnd"]
tags: ["Database", "MySQL", "Postgres"]
draft: false
---

## DATA

```sql
-- DDL
create database ex_join;

CREATE TABLE dogs
(
    id       INT(11) AUTO_INCREMENT NOT NULL,
    name     VARCHAR(30)            NOT NULL,
    owner_id INT(11)                NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE owners
(
    id   INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30)            NOT NULL,
    PRIMARY KEY (id)
);

insert into dogs (id, name, owner_id)
values (1, 'aka', 1);
insert into dogs (id, name, owner_id)
values (2, 'ao', 2);
insert into dogs (id, name, owner_id)
values (3, 'kuro', 1);
insert into dogs (id, name, owner_id)
values (4, 'shiro', 4);

insert into owners (id, name)
values (1, 'ichiro');
insert into owners (id, name)
values (2, 'jiro');
insert into owners (id, name)
values (3, 'saburo');
```

___Table dog___
| id | name | owner_id |
| --- | ----- | -------- |
| 1 | aka | 1 |
| 2 | ao | 2 |
| 3 | shiro | 1 |
| 4 | kuro | 4 |

___Table owner___
| id | name |
| --- | ----- |
| 1 | ichiro |
| 2 | jiro |
| 3 | saburo |

## Join

### inner join

```sql
  SELECT * FROM dogs
INNER JOIN owners
        ON dogs.owner_id = owners.id;

-----------------------------------------
| id  | name  | owner_id | id  | name   |
| --- | ----- | -------- | --- | ------ |
| 1   | aka   | 1        | 1   | ichiro |
| 3   | shiro | 1        | 1   | ichiro |
| 2   | ao    | 2        | 2   | jiro   |
-----------------------------------------

Table:dog のid:4 は抽出されない
```

### left outer join

```sql
SELECT * FROM dogs
LEFT OUTER JOIN owners
             ON dogs.owner_id = owners.id;

-----------------------------------------
| id  | name  | owner_id | id   | name   |
| --- | ----- | -------- | ---- | ------ |
| 1   | aka   | 1        | 1    | ichiro |
| 2   | ao    | 2        | 2    | jiro   |
| 3   | shiro | 1        | 1    | ichiro |
| 4   | kuro  | 4        | null | null   |
-----------------------------------------

Table:dog のid:4 の参照先(Table:owner)は null になる
```

### right outer join

```sql
SELECT * FROM dogs
RIGHT OUTER JOIN owners
              ON dogs.owner_id = owners.id;

-----------------------------------------
| id   | name  | owner_id | id  | name   |
| ---- | ----- | -------- | --- | ------ |
| 1    | aka   | 1        | 1   | ichiro |
| 3    | shiro | 1        | 1   | ichiro |
| 2    | ao    | 2        | 2   | jiro   |
| null | null  | null     | 3   | saburo |
-----------------------------------------

Table:owner のid:3 の参照先(Table:dog)は null になる
```

### cross join

```sql
SELECT *
FROM dogs
         CROSS JOIN owners

-----------------------------------------
| id  | name  | owner_id | id  | name   |
| --- | ----- | -------- | --- | ------ |
| 1   | aka   | 1        | 1   | ichiro |
| 1   | aka   | 1        | 2   | jiro   |
| 1   | aka   | 1        | 3   | saburo |
| 2   | ao    | 2        | 1   | ichiro |
| 2   | ao    | 2        | 2   | jiro   |
| 2   | ao    | 2        | 3   | saburo |
| 3   | kuro  | 1        | 1   | ichiro |
| 3   | kuro  | 1        | 2   | jiro   |
| 3   | kuro  | 1        | 3   | saburo |
| 4   | shiro | 4        | 1   | ichiro |
| 4   | shiro | 4        | 2   | jiro   |
| 4   | shiro | 4        | 3   | saburo |
-----------------------------------------

```

### union

```sql
SELECT *
FROM dogs d1
UNION
SELECT *
FROM dogs d2
;

-------------------------
| id  | name  | owner_id |
| --- | ----- | -------- |
| 1   | aka   | 1        |
| 2   | ao    | 2        |
| 3   | kuro  | 1        |
| 4   | shiro | 4        |
-------------------------

重複は削除される
```

### union all

```sql
SELECT *
FROM dogs d1
UNION ALL
SELECT *
FROM dogs d2
;

--------------------------
| id  | name  | owner_id |
| --- | ----- | -------- |
| 1   | aka   | 1        |
| 2   | ao    | 2        |
| 3   | kuro  | 1        |
| 4   | shiro | 4        |
| 1   | aka   | 1        |
| 2   | ao    | 2        |
| 3   | kuro  | 1        |
| 4   | shiro | 4        |
--------------------------

カラム数が合わないとError,強制的にカラム数を合わせる場合

SELECT *
FROM dogs d1
UNION ALL
SELECT *, '' as dummy
FROM owners o1
;

---------------------------
| id  | name   | owner_id |
| --- | ------ | -------- |
| 1   | aka    | 1        |
| 2   | ao     | 2        |
| 3   | kuro   | 1        |
| 4   | shiro  | 4        |
| 1   | ichiro |          |
| 2   | jiro   |          |
| 3   | saburo |          |
---------------------------
```
