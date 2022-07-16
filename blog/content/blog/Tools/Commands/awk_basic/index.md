---
title: "AWKコマンド基本"
date: "2022-02-22 21:34:50"
post_modified: "2022-02-22 21:34:50"
description: "テキスト処理のコマンド 'AWK' の基本的使い方 "
categories: ["Tools"]
tags: ["Command", "awk", "テキスト処理"]
draft: false
---

## Variable

| mark       | mean |
|------------|------|
| $0         | 行全部  |
| ${n}       | n 列目 |
| NR         | 行数   |
| NF         | 桁数   |
| FNR        | 処理行  |
| NR%{n}=={} | スキップ |

## Option

| option | mean         |
|--------|--------------|
| -f     | ファイル指定       |
| -F     | デリミタ ',' ' ' |
| -v     | 変数 'key=val' |

## File を指定して実行

```bash
echo | awk -f <file_name>
```

## File の中身表示

```bash
awk '{print $0}' <file_name>
```

## File の 1 列目表示

```bash
awk '{print $1}' <file_name>
```

## スキップ

```bash
# 3で割って1余る
awk 'NR%3で割って1余る==1' <file_name>
```

## 1 列目の合計と平均

```bash
awk '{sum+=$1} END {print sum,sum/NR}' <file_name>
```

## 1 列目が 2 の行を表示

```bash
awk '{if( $1 == 2 ){ print $0 }}' <file_name>
```

## ls コマンドを整形

```bash
ls -l | awk '{ print $3, $4, $9 }'
# 絞り込み
ls -l | awk '$9=="<search_word>" { print $3, $4, $9 }'
```

## 引数

```txt
# hoge.awk
{ print $1 * k }
```

```bash
echo "1" | awk -f hoge.awk -v 'k=2'
# 2
```

## 空白とカンマの両方を区切り文字

```bash
printf "a,b c" | awk -F '[, ]' '{ print $1, $2, $3 }'
 # a b c
```

## Match

```txt
# hoge.txt
a b c
d e f
```

```bash
awk -v 'str=e f' 'match( $0, str ){ print $0 }' huga.txt
# d e f
```

## CSV 出力

```txt
# hoge.awk
BEGIN { OFS = "," }

{
  for (i=1; i<=NF; i++) {
    printf "\"%s\"", $i;
    if( i < NF ) printf "%s",OFS
  }
}

END { printf "\n" }
```

```bash
echo "a b,c d" | awk -f hoge.awk
# "a","b,c","d"
```

## スクリプトで使用

```txt
BEGIN {
  while ( (getline var < ファイル名) > 0 ) {
    print var
  }
}
```

```bash
echo "abc" > abc.txt
$ echo "" | awk -f hoge.awk
# abc
```

## 合計・平均・分散・標準偏差を求める

```txt
hoge.awk
{
  sum += $1
  square_sum += $1 * $1
}

END {
  if ( NR == 0 ) exit

  average  = sum / NR
  variance = square_sum / NR - average * average
  std_dev  = sqrt( variance )

  print "　合計　:", sum
  print "　平均　:", average
  print "　分散　:", variance
  print "標準偏差:", std_dev
}
```

```txt
# fuga,txt
50
60
70
70
100
```

```bash
awk -f hoge.awk fuga.txt
# 　合計　: 350
# 　平均　: 70
# 　分散　: 280
# 標準偏差: 16.7332
```
