---
title: "Grep"
date: "2022-02-23 03:34:29"
post_modified: "2022-02-23 03:34:29"
description: "Grep コマンド コピペ用"
categories: ["Tools"]
tags: ["Command", "grep", "テキスト処理"]
draft: false
---

## Option

| option             | mean                                              |
| ------------------ | ------------------------------------------------- |
| -r                 | 再帰的に grep コマンドを実行する                  |
| --include=\*.rb    | 指定ファイルのみ検索                              |
| --exclude-dir=test | 指定フォルダを除外                                |
| -w                 | 単語としてマッチする場合(IDE の whole words only) |
| -e                 | 検索パターン 検索パターンを指定                   |
| -G                 | 基本正規表現を使う                                |
| -E                 | 拡張正規表現を使う                                |
| -P                 | Perl 正規表現を使う                               |
| -i                 | 大文字小文字区別しない                            |
| -w                 | Matches only word/words instead of substring.     |
| -v                 | マッチしない形を検索結果になる                    |
| -n                 | 行番号を表示する                                  |

## 検索

```bash
grep <search_word> <file_name>
```

## AND 検索

```bash
grep <search_word> <file_name> | grep <search_word>
```

## 複数条件

```bash
grep "aaa\|bbb" test.txt
```

## パタ-ン検索

```bash
grep -rnw ./ -e "pattern"
```

## -v マッチしない

```bash
grep -v -e '^\s*#' -e '^\s*$' filename
```

## ディレクトリ指定

```bash
grep -r "検索文字列" ディレクトリのパス
```

## 大文字小文字無視

```bash
grep -i "検索文字列" ファイル名
```
