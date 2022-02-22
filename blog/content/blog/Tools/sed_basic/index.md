---
title: "sed 基本知識"
date: "2022-02-23 03:41:26"
post_modified: "2022-02-23 03:41:26"
description: "sed コマンド コピペ用"
categories: ["Tools"]
tags: ["sed", "Command", "テキスト処理"]
draft: false
---

| mark             | mean                                           |
| ---------------- | ---------------------------------------------- |
| .                | # 任意の一文字                                 |
| \*               | # 直前の文字が任意の個数続く文字列(0 個も含む) |
| <space><space>\* | # 連続する SPACE を表す                        |
| <tab>            | # TAB                                          |
| .\*              | # 任意の文字列                                 |

## 置換

```bash
sed -e "s/aaaa/bbbb/"       # 置換 行で最初に出てきた'aaaa'を'bbbb'に置換
sed -e "s/aaaa/bbbb/g"      # 入力の全行に渡って置換 (Global)
sed -e "s/^aaaa/bbbb/"      # 行頭(^)に'aaaa'のもの
sed -e "s/aaaa\$/bbbb/"     # 行末($)に'aaaa'のもの。$は\でescape
sed -e "s/~/bbbb/"          # 行頭に'bbbb'を追加
sed -e "s/\$/bbbb/"         # 行末に'bbbb'を追加
sed -e "s/.*/abcd/"         # すべての行を'abcd'に置換
sed -e "s/aa.*bb//"         # aa*bbを削除
```

## デリミタ

**s の次の文字がデリミタになる。**

```bash
cat <filename> | sed -e "s@old1@new1@g" -e "s/old2/new2/g"
cat <filename> | sed -e "s@ol/d1@n/ew1@g" -e "s/old2/new2/g"  #ol/d1 を n/ew1 に置換
```

## TAB, SPACE

```bash
sed -e 's/<tab>/<space>/g'                       # TABをSPACEに置換
sed -e "s/<space><space>*/<space>/g"             # 複数のスペースを<space>に置換。<space>*ではない
sed -e "s/[<tab><space>][<tab><space>]*/<space>/g"   # ホワイトスペースを<space>に置換
```

## 行の削除

```bash
sed -e '1d' <filename>                # 1行目を消去
sed -e '1,4d' <filename>              # 1-4行目を消去
sed -e "/$d" <filename>               # 最終行を消去
sed -e '$-3,$d' <filename>            # 最後の4行を消去。$-3:最後から数えて3行目、すなわち最後から4行目
sed -e "/aaa/d"                 # aaaを含む行を削除 sはいらない
sed -e "/^[<space><tab>]*$/d"   # 空白行の削除
```

## 指定した行だけ表示 (-n オプション)

```bash
sed -n '1,4p' <filename>
sed -n '$p' <filename>
sed -n '2p'                # 指示した行だけを標準出力に
sed -n '2p' < <filename>
sed -n "s/aaaa/bbbb/gp"    # テキストが置換された行だけを表示
```

## 文字列の一部分を取り出す

```bash
sed -e "s/aa.*\(.*\)b\(.*\)b/\1/"    # 1つ目の()で囲まれた部分を取り出す。()は\でescapeする
sed -e 's/aa.*(.*)b(.*)b/\2/'        # 2つ目の()で囲まれた部分を取り出す
# Example
$ id root
uid=0(root) gid=0(root) groups=0(root)
$ id root | sed -e 's/uid=\(.*\)(\(.*\)) gid=.*/\1/'
0
$ id root | sed -e 's/uid=\(.*\)(\(.*\)) gid=.*/\2/'
root
```

## キーワードによる行の指定

```bash
sed -e '2,$s/aaa/bbb/g' <filename>         # 2行目から最終行まで処理する
sed -e '/aaaa/,/bbbb/d' <filename>         # aaaaを含む行からbbbbを含む行までを削除
sed -n '/aaaa/,/bbbb/p' <filename>         # aaaaを含む行からbbbbを含む行までを表示

sed -n '/^BEGIN$/,/^END$/p' <filename>     # BEGINのみの行からENDのみの行までを表示する
sed -n '/^BEGIN$/,/^END$/!p' <filename>    # BEGINのみの行からENDのみの行までを表示しない
sed -e '/^BEGIN$/,/^END$/d' <filename>     # BEGINのみの行からENDのみの行までを削除
```

## 特定の範囲指定

````bash
target_content=```cat $html_file | sed '/[\<pre>/,/[^\<\/pre>]*\<\/pre>/d'```
````

## sed では \d が使えない

`[0-9]` を使う

```bash
sed  -i -e "s/https:\/\/blog.webdimension.jp\/wp-content\/uploads\/[0-9][0-9][0-9][0-9]\/[0-9][0-9]\//images\//g" $markdown_file
```
