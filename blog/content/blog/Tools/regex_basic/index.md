---
title: "正規表現 基本知識"
date: "2022-02-23 03:38:28"
post_modified: "2022-02-23 03:38:28"
description: "正規表現 コピペ用"
categories: ["Tools"]
tags: ["正規表現", "テキスト処理"]
draft: false
---

## 基本

### １文字にマッチ

| mark          | Mean                                |
| ------------- | ----------------------------------- |
| . (dot)       | なにか一文字                        |
| [xxx]         | どれか一文字                        |
| [^xxx]        | これ以外の一文字                    |
| [x-x]         | この範囲の遺著文字                  |
| [a-d[m-p]]    | a 〜 d、または m 〜 p:[a-dm-p] 結合 |
| [a-z&&[def]]  | d、e、f 交差                        |
| [a-z&&[^bc]]  | b と c を除く a 〜 z:[ad-z] 減算    |
| [a-z&&[^m-p]] | m 〜 p を除く a 〜 z:[a-lq-z] 減算  |

### メタ文字にマッチ

| mark       | Mean                                          |
| ---------- | --------------------------------------------- |
| \d         | 数字１文字                                    |
| \d         | 数字以外の１文字                              |
| \w         | 英数字か\_１文字                              |
| \W         | 英数字か\_以外の１文字                        |
| \s         | 空白 （半角スペース、タブ、改行）１文字       |
| \S         | 空白 （半角スペース、タブ、改行）以外の１文字 |
| \t         | タブ                                          |
| \b         | 単語の境界                                    |
| \B         | 単語の境界以外                                |
| \l         | 半角英数小文字                                |
| \L         | 半角英数小文字以外                            |
| \u         | 半角英数大文字                                |
| \U         | 半角英数大文字以外                            |
| \n         | 改行(LF)                                      |
| \r         | 改行(CR)                                      |
| \ メタ文字 | メタ文字そのものにマッチ                      |

#### メタ文字

. \* + ? \ | ^ $ [] () {}

### どれかの単語にマッチ

| mark     | Mean         |
| -------- | ------------ |
| xx \| yy | どれかの単語 |

### 先頭・末尾にマッチ

| mark | Mean |
| ---- | ---- |
| ^    | 先頭 |
| $    | 末尾 |

### 繰り返しにマッチ

| mark   | Mean                                       |
| ------ | ------------------------------------------ |
| x\*    | x を０回以上繰り返す (x はない場合もある)  |
| x+     | x を 1 回以上繰り返す (x は最低１個はある) |
| x"     | x があってもなくてもマッチする             |
| x{n}   | x を n 回繰り返す                          |
| x{n,}  | x を n 回以上繰り返す                      |
| x{n,m} | x を n~m 回繰り返す                        |

### 最短マッチ

| mark | Mean                               |
| ---- | ---------------------------------- |
| x?   | マッチするもので最短の範囲にマッチ |

### キャプチャでマッチ

| mark    | Mean                                             |
| ------- | ------------------------------------------------ |
| (xx) \1 | (xx)でマッチした文字を \1 の位置でもう一度マッチ |

### 先読み・あと読み

| mark    | Mean                                                             |
| ------- | ---------------------------------------------------------------- |
| w(?=x)  | 【先読み】後ろに x がついているときだけ w でマッチする           |
| w(?!x)  | 【否定的先読み】後ろに x 以外がついているときだけ w でマッチする |
| (?<=x)w | 【後読み】前に x がついているときだけ w でマッチする             |
| (?<!x)w | 【否定的後読み】前に x 以外がついているときだけ w でマッチする   |

## Example

### 時間

`([01]\d|2[0-3]):[0-5]\d:[0-5]\d`

### 日付

`\d{4}([\-\.\/])(0[1-9]|1[0-2])\1([0-9]|[12]\d|3[01])`

### 郵便番号

`^\d{3}-\d{4{`

### メールアドレス

`[\w\-\.]+@[\w\-\.]+\.[a-za-z]+$`

### HTML の要素

`<(\w+)>.*</\1>`

### 空の HTML の要素

`<(\w+)></\1>`

### URL

`https?://[\w\=\.~!#\$%&'\(\)\*\+,/;=?@\[\]]+`

### URL からドメイン

`(?<=https?://)[\w\-\.]+(?=/.*)`

### 数式

`[ -~]+`

### Path からファイル名

`[^/]+$`

### Path からディレクトリ名

`^.*/`
