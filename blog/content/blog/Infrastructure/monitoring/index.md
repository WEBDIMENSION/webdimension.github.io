---
title: "サーバーモニタリングツール"
date: "2022-02-23 04:21:55"
post_modified: "2022-02-23 04:21:55"
description: "サーバーの状態把握をするためのコマンド"
categories: ["Infrastructure"]
tags: ["Security", "Command"]
draft: false
---

## top

## vmstat

```bash
# /1sec
vmstat 1
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0      0 435508  84928 792912    0    0     7     9  164  221  1  1 98  0  0
 0  0      0 435256  84928 792912    0    0     0     0  178  206  1  2 97  0  0
 0  0      0 435756  84928 792912    0    0     0     0  177  228  1  2 97  0  0
 0  0      0 435260  84928 792912    0    0     0     0  201  227  2  2 96  0  0
 1  0      0 434744  84928 792912    0    0     0    12  177  203  1  1 98  0  0
 0  0      0 435468  84928 792912    0    0     0     0  224  258  2  3 95  0  0
 1  0      0 435600  84928 792912    0    0     0     0  186  211  2  2 96  0  0
 1  0      0 436240  84928 792912    0    0     0     0  171  207  1  0 99  0  0
 1  0      0 435620  84928 792912    0    0     0     0  185  220  1  3 96  0  0
 0  0      0 435124  84936 792904    0    0     0    40  179  221  1  1 98  0  0
 0  0      0 435756  84936 792912    0    0     0    44  191  220  1  2 97  0  0
 0  0      0 435504  84936 792912    0    0     0     0  171  217  1  1 98  0  0
 0  0      0 436004  84936 792912    0    0     0     0  174  216  1  1 98  0  0

```

## iostat

```bash
iostat
Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.76    0.00    1.44    0.02    0.00   97.77

Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda               1.19         6.77         9.39     423937     587992
```

```bash
iostat -h
Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.76    0.00    1.44    0.02    0.00   97.77

Device:            tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda
                  1.19         6.76         9.39     423937     588492
```

```bash
iostat -x
Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.76    0.00    1.44    0.02    0.00   97.77

Device:         rrqm/s   wrqm/s     r/s     w/s    rkB/s    wkB/s avgrq-sz avgqu-sz   await r_await w_await  svctm  %util
sda               0.09     0.84    0.21    0.98     6.76     9.38    27.08     0.00    3.06    2.84    3.10   0.65   0.08
```

## sar

```bash
sar 1$B!!(B3

Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

11:59:29        CPU     %user     %nice   %system   %iowait    %steal     %idle
11:59:30        all      1.02      0.00      3.06      0.00      0.00     95.92
11:59:31        all      2.02      0.00      1.01      0.00      0.00     96.97
11:59:32        all      1.01      0.00      2.02      1.01      0.00     95.96
Average:        all      1.35      0.00      2.03      0.34      0.00     96.28

```

```bash
sar -b 1 3

12:01:16          tps      rtps      wtps   bread/s   bwrtn/s
12:01:17         1.02      0.00      1.02      0.00     32.65
12:01:18         0.00      0.00      0.00      0.00      0.00
12:01:19         0.00      0.00      0.00      0.00      0.00
Average:         0.34      0.00      0.34      0.00     10.85
```

```bash
sar -r  1 3
12:02:35    kbmemfree kbmemused  %memused kbbuffers  kbcached  kbcommit   %commit  kbactive   kbinact   kbdirty
12:02:36       433608   1449516     76.97     85424    729440   1520448     38.20    988812    352816        36
12:02:37       434224   1448900     76.94     85424    729440   1520448     38.20    987728    352816        36
12:02:38       433980   1449144     76.95     85424    729440   1520448     38.20    988496    352816         0
Average:       433937   1449187     76.96     85424    729440   1520448     38.20    988345    352816        24
```

```bash
sar
# display current date done
Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

11:40:02        CPU     %user     %nice   %system   %iowait    %steal     %idle
11:50:01        all      0.93      0.00      1.46      0.03      0.00     97.58
12:00:01        all      0.97      0.00      1.47      0.02      0.00     97.54
Average:        all      0.95      0.00      1.46      0.02      0.00     97.56
```

```bash
#specify file
sar -f /var/log/sa/sa24

Linux 3.10.0-862.14.4.el7.x86_64 (centos75.exp) 	03/24/20 	_x86_64_	(1 CPU)

11:40:02        CPU     %user     %nice   %system   %iowait    %steal     %idle
11:50:01        all      0.93      0.00      1.46      0.03      0.00     97.58
12:00:01        all      0.97      0.00      1.47      0.02      0.00     97.54
Average:        all      0.95      0.00      1.46      0.02      0.00     97.56

```
