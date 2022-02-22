---
title: "Vim コマンド"
date: "2022-02-23 02:56:15"
post_modified: "2022-02-23 02:56:15"
description: "Vim コマンド カンニング用"
categories: ["Tools"]
tags: ["Vim"]
draft: false
---

## Normal mode

- \* search word
- n next search word
- . repeart

* vitu vs guit (replace Uppercase to lowercase)

- dip p is Paragraph
- dis s is sentence
- m{a-zA-A} as mark lowcase is this file Uppecase is global
- \`{a-zA-A} as mark lowcase is this file Uppecase is global
- :jumps
- <ctl>o previous
- <ctl>i next
- :changes
- g; previous chane list
- g, next change list
- \`. latest change point
- \^. latest insert point
- gf jump file
- <ctl>[ previous
- <ctl>] next
- \_d{motion} black hall rgister
- ad{motion} ap{motion} ap use "a" register
- "+p paste clip board
- "%p current file name
- "%# altanative file name
- ".p latest insert text
- ":p latest exec command
- "/ latest search word
- q{register} Start macro
- q end macro
- visual mode + "normal @a " paralel exec
- :argsdo normal @a paralel exec
- /a.k.a.<CR> b{ackwoar}d a.k.a
- /a\.k\.a\.<CR> a.k.a
- /\Va.k.a.<CR> a.k.a

- /\V(%(And|D)rew) (Neil) register 1 = andrew or drew , register 2 = Neil
- :%s//\2, \1/g

- :%s/before/after first mach
- :%s/before/after/g in line
- :%%s/before/after/g global
- :%%s/before/after/gc global and prompt

- <ctl>/ latest serch word
- :%%s/<ctl>r//after/gc global and prompt

- /\V(<man>|<dog>)
- :%%s//\={"dog":"man","man":"dog"}[sub-match(1)]/g

- :grep word \* make quick list
- :cnext / :cprev jump to source

- :vim /<ctl>r// \*\* vimgrep

## Global command

// Delete html tag

- /\v\</?\w+>
- :g//d

// delete donsn't contain href

- :v/href/d

- :g/word display lines contain word
- :g/word/yank A lines contain word regist register A(uppercase is append, lowercase is over write)
- :g/word/t$ Paste buttom line contain word

## Insert mode

- <ctl>r 0 paste register 0
- <ctl>r <ctl>-p {registar} past register
- <ctl>r = calc
- gv latest selected area
- <ctl>h delete left char
- <ctl>w delete left word
- <ctl>u delete to line first
- <ctl>0 onetime normal mode
- <ctl>r+ paste clip board

# Visual mode

- o toggle cursol in selected area
- gu lowwer case
- gU upper case
- : command for selected area
- S' Sorround vim
- S" Sorround vim
- S[ Sorround vim
- cs"' Sorround vim change ' to "

## Command mode

- /pattern<CR> search for forward
- ?pattern<CR> search for backward
- :s/target/replacer<CR> replace
- :s/target/replacer/g<CR> replace global

- :[range]delete [x] to register
- :[range]yank [x] to register
- :[range]put [x] to register
- :[range]copy [address]
- :[range]t [address] equal copy
- :[range]move [address]
- :[range]m[address] equal move
- :[range]join
- :[range]normal {command}
- :[range]substitute/{Pattern}/{string}/[flag] replace word first word
- :[range]global/{pattern}/[cmd] replace global

- :1 to head
- :$ to bottom
- :3p to line numbe 3 and print
- :2.5p print between line number 2 to 5

- :%s//<ctl>r<ctl>w/g Replace
- <ctl>r<ctl>w is select word to comman window
- <ctl>r<ctl>a is select WORD to comman window
- <ctl>r<ctl>0 paste register 0 to command window
- q: history
- :2,$!sort -t ',' -k2 sort for selected area
- :e shell
- :!{cmd}
  :l

- :[rang]!{filter}
- :bd buffer delete
- :%% active path
- :cd %%
- :lcd %%
- :!mkdir -p %%

### Pattern

```bash
/#\([0-9a-fA-F]\{6}\|[0-9a-fA-F]\{3}\)
/#\([0-9a-fA-F]\{6}\)
↓
/\v#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})
/\v#([0-9a-fA-F]{6})
↓
/\v#(\x{6}|\x{3})
```

#### 重複

```bash
/\v<(\w+)\_s+\1>
* \_s は空白文字 改行文字
```

#### 境界

```bash
/\vthe
↓
/\v<the>
```

#### 入れ替え

```bash
/\v(%(And|D)rew) (Neil)
%s//\2, \1/g
```

#### 強調表示の絞り込み

```bash
* ""の中を強調表示
/\v"\zs[^"]+\ze"
```

#### カーソル上の単語をコマンドラインへ

```bash
<C-r><C-w>
```

### Match Count

```bash
:%s///gn
```

#### 単語の末尾へ

```bash
/word/e
```

### 単語の末尾へ変更

```bash
//e
```

#### シングルコーテーション内選択

```bash
/\v'([^']|'\w)+'
/\v'(([^']|'\w)+)'
```

#### ダブルコーテーションへ変更

```bash
:%s//"\1"/g
```

#### 統合

```bash
:%s/\v'(([^']|'\w)+)'/"\1"/g
```

#### 確認

```bash
:%s/\v'(([^']|'\w)+)'/"\1"/gc
```

#### h2, h3, h4 -> h1, h2, h3

```bash
/\v\<\/?h\zs\d
:%s//\=submatch(0)-1/g
```

### 複数ワード入れ替え

```bash
/\v(<man>|<dog>)
%s//\={"dog":"man","man":"dog"}[submatch(1)]/g
```

##### Plugin abolish

```bash
:%S/{man,dog}/{dog,man}/g
```

#### Buffer 全部に実行

```bash
*Pragmatic Vim <- 対象
*Pragmatic bookshelf  <- 非対称

/Pragmatic\ze Vim
:vimgrep /<C-r>// **/*.txt
:argsdo %s//Practical/ge
```

#### Quickfix に実行

```bash
:cdo
```

#### ファイルなの{}内のソート

```bash
:g/{/ .+1,/}/-1 sort
```

---

### Nerdtree

- " File node mappings~
- " double-click,
- " o: open in prev window
- " go: preview
- " t: open in new tab
- " T: open in new tab silently
- " middle-click,
- " i: open split
- " gi: preview split
- " s: open vsplit
- " gs: preview vsplit
- " <CR>: custom open
- "
- " ----------------------------
- " Directory node mappings~
- " double-click,
- " o: open & close node
- " O: recursively open node
- " t: open in new tab
- " T: open in new tab silently
- " <CR>: custom open
- " x: close parent of node
- " X: close all child nodes of
- " current node recursively
- " middle-click,
- " e: explore selected dir
- "
- " ----------------------------
- " Bookmark table mappings~
- " double-click,
- " o: open bookmark
- " go: preview file
- " go: find dir in tree
- " t: open in new tab
- " T: open in new tab silently
- " i: open split
- " gi: preview split
- " s: open vsplit
- " gs: preview vsplit
- " <CR>: custom open
- " D: delete bookmark
- "
- " ----------------------------
- " Tree navigation mappings~
- " P: go to root
- " p: go to parent
- " K: go to first child
- " J: go to last child
- " <C-j>: go to next sibling
- " <C-k>: go to prev sibling
- "
- " ----------------------------
- " Filesystem mappings~
- " C: change tree root to the
- " selected dir
- " u: move tree root up a dir
- " U: move tree root up a dir
- " but leave old root open
- " r: refresh cursor dir
- " R: refresh current root
- " m: Show menu
- " cd:change the CWD to the
- " selected dir
- " CD:change tree root to CWD
- "
- " ----------------------------
- " Tree filtering mappings~
- " I: hidden files (off)
- " f: file filters (on)
- " F: files (on)
- " B: bookmarks (on)
- "
- " ----------------------------
- " Custom mappings~
- "
- " ----------------------------
- " Other mappings~
- " q: Close the NERDTree window
- " A: Zoom (maximize-minimize)
- " the NERDTree window
- " ?: toggle help
- "
- " ----------------------------
- " Bookmark commands~
- " :Bookmark [<name>]
- " :BookmarkToRoot <name>
- " :RevealBookmark <name>
- " :OpenBookmark <name>
- " :ClearBookmarks [<names>]
- " :ClearAllBookmarks
- " :ReadBookmarks
- " :WriteBookmarks
- " :EditBookmarks
