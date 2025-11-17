---
title: "MySQLよく使うコマンド"
date: "2025-11-17 15:06:39"
post_modified: "2025-11-17 15:06:39"
description: "MySQLよく使うコマンド忘れないようにメモ"
categories: ["BackEnd"]
tags: ["MySQL"]
topics: ""
draft: false
---


## MySQLでよく使うコマンド 忘れないようにメモ

忘れないようにメモ


```sql
-- Rootユーザーのパスワード変更
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

-- ユーザー作成
CREATE USER 'hoge'@'localhost' IDENTIFIED BY 'hogehoge';
GRANT ALL PRIVILEGES ON * . * TO 'hoge'@'localhost';
FLUSH PRIVILEGES;

--Dump
mysqldump -u root -p -h localhost DB_NAME > OUTPUT_FILENAME

-- Restore
mysql -u root -p DB_NAME < SQL_FILE_NAME

```