---
title: "Excelショートカット"
date: "2025-11-17 16:07:34"
post_modified: "2025-11-17 16:07:34"
description: "できれば使いたくないエクセルをショートカットを覚えて快適操作"
categories: ["Tools"]
tags: ["Windows"]
topics: ""
draft: false
---


##　Excelショートカット  

Mac (Usキーボード) から Parallels Windows のエクセルを操作する前提

参考

https://youtu.be/wnGa1DB9bnU?si=u6Z6bzS2dQ9Cw-Ni

### 左右スクロール　alt + page up/down 

A: autohotkey で対応

alt+ , ( alt + <)
alt+ . ( alt + >)

```txt
!,::Send "!{PgUp}"
!.::Send "!{PgDn}"
```


### シートの切り替え　ctl + page up/down'

A: autohotkey で対応

ctl + , ( ctl  + <)
ctl + . ( ctl  + >)

```txt
^,::Send "^{PgUp}"
^.::Send "^{PgDn}"
```

### プルダウン　alt +down

A: autohotkey で対応

alt + \
alt + shift + \

```txt
!\::Send "!{Down}"
!+\::Send "!+{Down}"
```

### 太字

ctl ＋　b

### 斜体

ctl + i

### 下線

ctl + u

### 取消線

ctl + 5

### 行のA列　home 

A:Karabiner で対応 (space長押し + o)

### A列の1 ctl + home

A: autohotkeyで対応 space + ctr +o

### 表の右下 ctl + end

A: autohotkeyで対応 space + ctl + e

### データ範囲の隅

ctl + 矢印 A: Karabiner or autohotkeyで作った方がよい？
ctl + down はmacの木ボードショートカットか来ている
(macのキーボードショートカットをOFF)~~

ctl + shift + h/j/k/l


```txt
^+h::Send "^+{Left}"
^+j::Send "^+{Down}"
^+k::Send "^+{Up}"
^+l::Send "^+{Right}"
```
### ジャンプ

ctl  + g

### データ入力範囲の指定

ctl + shift + 矢印 A: Karabiner or autohotkeyで作った方が良い？~~

autohotkeyで対応 ctl _ shit + h/j/k/l

```txt
^!h::Send "^{Left}"
^!j::Send "^{Down}"
^!k::Send "^{Up}"
^!l::Send "^{Right}"

```

### テーブル

ctl + t

### 罫線の削除

ctl  + shift  \   A:  ctl + shift  +'-"   (USキーボードだから(ctr + _))

### 合計

alt + shift + = A: alt + = (USキーボード)

### セルの書式設定

ctl + 1~~

### 検索

ctl + f

### 置き換え

ctl + h

### 桁区切り

ctl + shift + 1

### %表示

ctl  + shift + 5

### フィルター

ctl + shift + l
~~フルターの中身を見る際の alt + down は karabiner or autohotkeyで対応した方が良いかも？~~

### 数式の表示

ctl  + shift + @ A: usキーボードではできない 

alt -> m -> h のショートカットで対応

---

### オートフィルダブルクリック

Alt → H → F → I → S

### シートの追加

Shift F11 同時押し):新しいワークシートを挿入します。

### シートの削除

alt → H → D → S

### 行の固定

ウィンドー枠の固定　ショートカットでいける

Alt ->  W ->  F ->  F

