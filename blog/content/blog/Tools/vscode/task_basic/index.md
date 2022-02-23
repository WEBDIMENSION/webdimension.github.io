---
title: "vscode の task の設定"
date: "2022-02-23 02:47:33"
post_modified: "2022-02-23 02:47:33"
description: "vscode で Task を設定する際の変数"
categories: ["Tools"]
tags: ["VSCode", "Intellij IDEA"]
draft: false
---

## tasks.json

例) Intellij IDEA で開く

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Open IDEA",
      "type": "shell",
      "command": "open -a 'IntelliJ Idea' ${file}"
    }
  ]
}
```

workspace 単位

- workspace/.vscode/tasks.json

Global

- ~/Library/Application Support/Code/User/tasks.json

## Variable

| 変数                       | 中身                                                     |
| -------------------------- | -------------------------------------------------------- |
| ${workspaceFolder}         | VS Code で開かれたフォルダのパス                         |
| ${workspaceFolderBasename} | VS Code で開いたフォルダの名前、スラッシュ（/）なし      |
| ${file}                    | 現在開かれているファイル                                 |
| ${relativeFile}            | workspaceFolder を基準にした現在開いているファイル       |
| ${relativeFileDirname}     | workspaceFolder を基準にした現在開いているファイル       |
| ${fileBasename}            | 現在開かれているファイルのベース名                       |
| ${fileBasenameNoExtension} | ファイルを拡張子なしで現在開かれているファイルのベース名 |
| ${fileDirname}             | 現在開かれているファイルのディレクトリ名                 |
| ${fileExtname}             | 現在開いているファイルの拡張子                           |
| ${cwd}                     | タスクランナー起動時のカレント作業ディレクトリ           |
| ${lineNumber}              | VSCode の編集画面で現在選択されている行番号              |
| ${selectedText}            | VSCode の編集画面で現在選択されているテキスト            |
| ${execPath}                | 実行中の VS Code 実行可能ファイル「code.exe」のアドレス  |
| ${defaultBuildTask}        | デフォルトのビルドタスクの名前                           |
