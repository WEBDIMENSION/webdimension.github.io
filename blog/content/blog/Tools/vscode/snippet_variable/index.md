---
title: "vscode で snippet"
date: "2022-02-23 02:43:43"
post_modified: "2022-02-23 02:43:43"
description: "vscode の snippet の変数"
categories: ["Tools"]
tags: ["VSCode", "Snippet"]
draft: false
---

## General

| 変数             | 意味                                           |
| ---------------- | ---------------------------------------------- |
| TM_SELECTED_TEXT | 現在選択されているテキストまたは空の文字列     |
| TM_CURRENT_LINE  | 現在の行の内容                                 |
| TM_CURRENT_WORD  | カーソルの下の単語の内容または空の文字列       |
| TM_LINE_INDEX    | ゼロインデックスベースの行番号                 |
| TM_LINE_NUMBER   | ワンインデックスベースの行番号                 |
| TM_FILENAME      | 現在のドキュメントのファイル名                 |
| TM_FILENAME_BASE | 現在のドキュメントの拡張子なしのファイル名     |
| TM_DIRECTORY     | 現在のドキュメントのディレクトリ               |
| TM_FILEPATH      | 現在のドキュメントの完全なファイルパス         |
| CLIPBOARD        | クリップボードの内容                           |
| WORKSPACE_NAME   | 開いているワークスペースまたはフォルダーの名前 |

## Data time

| 変数                     | 意味                           |
| ------------------------ | ------------------------------ |
| CURRENT_YEAR             | 現在の年                       |
| CURRENT_YEAR_SHORT       | 現在の年の下 2 桁              |
| CURRENT_MONTH            | 2 桁の月（例 '02'）            |
| CURRENT_MONTH_NAME       | 月のフルネーム（例：「7 月」） |
| CURRENT_MONTH_NAME_SHORT | 月の短い名前（例： 'Jul'）     |
| CURRENT_DATE             | 月の日                         |
| CURRENT_DAY_NAME         | 曜日の名前（例：「月曜日」）   |
| CURRENT_DAY_NAME_SHORT   | 曜日の短い名前（例： 'Mon'）   |
| CURRENT_HOUR             | 24 時間形式の現在の時間        |
| CURRENT_MINUTE           | 現在の分                       |
| CURRENT_SECOND           | 現在の秒                       |
| CURRENT_SECONDS_UNIX     | Unix エポックからの秒数        |

## Comment

| 変数                | 意味                             |
| ------------------- | -------------------------------- |
| BLOCK_COMMENT_START | 出力例：PHP / \*または HTML <！- |
| BLOCK_COMMENT_END   | 出力例：PHP \* /または HTML->    |
| LINE_COMMENT        | の出力例：PHP の場合//           |
