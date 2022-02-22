---
title: "MySQL の設定ファイル my.ini の項目"
date: "2022-02-23 00:04:00"
post_modified: "2022-02-23 00:04:00"
description: "my.ini の項目。覚えられないのでカンニング用"
categories: ["BackEnd"]
tags: ["Database", "MySQL"]
draft: false
---

**Example**

```ini
[client]
# pipe=
# socket=MYSQL
port=3306

[mysql]
no-beep

[mysqld]
port=3306
datadir=/var/lib.mysql
default_authentication_plugin=caching_sha2_password
default-storage-engine=INNODB
sql-mode="STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION"
log-output=FILE
general-log=0
general_log_file="LAPTOP-B851ACLE.log"
slow-query-log=1
slow_query_log_file="LAPTOP-B851ACLE-slow.log"
long_query_time=10
log-error="LAPTOP-B851ACLE.err"
log-bin="LAPTOP-B851ACLE-bin"
server-id=1
lower_case_table_names=1
secure-file-priv=""
max_connections=151
table_open_cache=2000
tmp_table_size=66M
thread_cache_size=10
myisam_max_sort_file_size=100G
myisam_sort_buffer_size=123M
key_buffer_size=8M
read_buffer_size=64K
read_rnd_buffer_size=256K
innodb_flush_log_at_trx_commit=1
innodb_log_buffer_size=1M
innodb_buffer_pool_size=8M
innodb_log_file_size=48M
innodb_thread_concurrency=17
innodb_autoextend_increment=64
innodb_buffer_pool_instances=8
innodb_concurrency_tickets=5000
innodb_old_blocks_time=1000
innodb_open_files=300
innodb_stats_on_metadata=0
created table
innodb_file_per_table=1
innodb_checksum_algorithm=0
back_log=80
flush_time=0
join_buffer_size=256K
max_allowed_packet=4M
max_connect_errors=100
open_files_limit=4161
sort_buffer_size=256K
table_definition_cache=1400
binlog_row_event_max_size=8K
sync_master_info=10000
sync_relay_log=10000
sync_relay_log_info=10000
loose_mysqlx_port=33060
```
