---
title: "sort コマンド 基本知識"
date: "2022-02-23 03:44:12"
post_modified: "2022-02-23 03:44:12"
description: "sort コマンド コピペ用"
categories: ["Tools"]
tags: ["sort", "Command", "テキスト処理"]
draft: false
---

## Options

| mark    | mean                    |
| ------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| -f      | --ignore-case           | 大文字／小文字を区別しないで並べ替える                                                                                                              |
| -V      | --version-sort          | 自然な（バージョン）数字順で並べ替える                                                                                                              |
| -n      | --numeric-sort          | 文字列を数値と見なして並べ替える                                                                                                                    |
| -h      | --human-numeric-sort    | 人が読むことのできる形式の数値で並べ替える（例：2K、1G など）                                                                                       |
| -g      | --general-numeric-sort  | 一般的な数値として並べ替える                                                                                                                        |
| -M      | --month-sort            | 月名で並べ替える（不明、JAN……DEC の順）                                                                                                             |
| -d      | --dictionary-order      | データが空白と英数字のみ含まれていると仮定して並べ替える                                                                                            |
| -b      | --ignore-leading-blanks | 先頭の空白を無視して並べ替える                                                                                                                      |
| -i      | --ignore-nonprinting    | 表示可能な文字だけを対象に並べ替える                                                                                                                |
| -R      | --random-sort           | キーのランダムハッシュ順に並べ替える                                                                                                                |
| -       | -random-source=ファイル | ランダムソースのファイルを設定する                                                                                                                  |
| -       | -sort=指定              | 並べ替えの方法を指定する（general-numeric、human-numeric、month、numeric、random、version）                                                         |
| -r      | --reverse               | 逆順で並べ替える                                                                                                                                    |
| -k 指定 | --key=指定              | 場所と並べ替え種別を指定する（「-k 2」なら 2 列目、「-k 2n」なら 2 列目を数値として並べ替える。複数指定する場合は「-k」オプションを複数回指定する） |
| -t 文字 | --field-separator=文字  | フィールドの区切り文字を指定する（デフォルトは空白文字）                                                                                            |

### Other

| mark            | mean                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| -m              | --merge 並べ替えられたファイルをマージする（並べ替え自体は行わない）                                                                      |
| -c              | --check,--check=diagnose-first 並べ替えられているかどうかを確認する                                                                       |
| -C              | --check=quiet,--check=silent 「-c」」と同様だが、メッセージは出力しない（スクリプト内の判定行などで使用）                                 |
| -u              | --unique 同一行は 1 つ目だけを出力する（「-c」と併せて使用した場合、厳密に順序を確認する）                                                |
| -z              | --zero-terminated 最後に NULL 文字を出力する                                                                                              |
| -o ファイル名   | --output=ファイル名 結果を出力するファイル名を指定する（デフォルトは標準出力）                                                            |
| --files0-from=F | NULL 文字で区切られたファイル名のリストを指定する（「--files0-from=- 」とした場合、ファイル名を標準入力から読み込む：本連載第 62 回参照） |
| --debug         | 並べ替えに使用されている行の一部に注釈を付けて、不確かな使用方法について標準エラー出力に警告を表示する                                    |

## 昇順

```bash
sort <file_name>
```

## 降順

```bash
sort -r  <file_name>
```

## CSV 並び替え

```bash
#（区切り文字を「,」として、3番目のフィールドで並べ替える）
sort -k 3 -t , <file_name>
#（区切り文字を「,」として、3番目のフィールドの値を数値として並べ替える）
sort -k 3n -t , <file_name>
```

## 重複削除

```bash
sort -u <file_name>
```

## 大文字小文字無視

```bash
sort -f <file_name>
```