---
title: "Marp markdownでスライド作成"
date: "2025-11-17 01:44:10"
post_modified: "2025-11-17 01:44:10"
description: "markdown記法でスライド(パワーポイント)を作れる"
categories: ["Tools"]
tags: ["Markdown", "Marp"]
draft: false
---

## markdown から　スライドを作れるツール Marp 

いつもなんでもかんでもmarkdownを使っている。 メモ、日報　など。

そのmarkdownでスライド(パワーポイインと)も作れるようなので試してみた

### markdown を用意しておく

```markdownd 
---
marp: true
header: "テーマ"
footer: ":eagle:"
theme: marp
size: 16:9
---

##   

<!--
_class: title
-->

# Marp

---

# page2

## 見出し

<div>
<div>

### 左

- lll
- lll
- lll
- lll
 
ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ
</div>
<div>
中央

ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ

</div>
<div>
右

ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ
</div>
</div>

## 見出し

<div>
<div>

### 左

- lll
- lll
- lll
- lll

ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ
</div>
<div>
中央

ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ

</div>
<div>
右

ここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンここにコンテンツツツツツツツここにコンテンツ
</div>
</div>

## head2

:smile: <span class="blue">class blue</span><span class="red">class red</span> **strong** *italic* <span class="orange">
orange</span> <span class="green">green</span>
~~docker rm コンテナ名~~

```docker run --name marp --rm --init -v $PWD/Docs:/home/marp/app -v  ~/marp.css:/home/marp/app/marp.css  -e LANG=$LANG -p 8081:8080 -p 37717:37717 marpteam/marp-cli -s . --theme my.css```

`docker run --name marp --rm --init -v $PWD/Docs:/home/marp/app -v  ~//marp.css:/home/marp/app/marp.css  -e LANG=$LANG -p 8081:8080 -p 37717:37717 marpteam/marp-cli -s . --theme my.css`

`docker run --rm --init -v $PWD/Docs:/home/marp/app/ -e LANG=$LANG -p 37717:37717 marpteam/marp-cli -w memo.md`
docker rm marp

| tes | test | test | test |
|:----|:-----|:-----|:-----|
| aaa | sss  | sss  | sss  |
| aaa | sss  | sss  | sss  | 

---

# page3

### test

test

---

# page4

---

# page5

``` 

### css も用意しておく

```css
/* @theme marp */
/*@import default;*/
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400&family=Varela+Round&display=swap');

* {
    font-family: 'M PLUS Rounded 1c', sans-serif;
}

section {
    /*background-color: #ffffff;*/
    background-color: #ffffff;
    color: #333333;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 12px;
    font-size: 18px;
    /*width: 1280px;*/
    /*height: 1810px;*/
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e6e6e6;
    padding: 4px 8px;
    color: #4a6986;
    font-size: 1.3rem;
}

section.title {
    background-color: #4a6986;
    color: #ffffff;
    /*padding: 30px;*/
    /*font-size: 16rem;*/
    /*text-align: center;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0) 40%
    );
}

section.title > header{
    font-size: 4rem;
}
section.title > h1{
    font-size: 4rem;
}

footer {
    width: 100%;
    position: fixed;
    padding: 2px;
    background: linear-gradient(to right, #4a6986, #e6e6e6);
    color: #ffffff;
    bottom: 0px;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem !important;
    /*gap: 20px;*/
}
section p {
    margin: 0;
    background-color: #ffffff;
}

h1 {
    font-size: 1.6rem;
    margin: 0;
    color: #4a6986;
}

h2 {
    font-size: 1.3rem;
    margin: 0;
    border-bottom: 1px solid #4a6986 ;
    border-left: 2px solid #4a6986 ;
    padding-left: 8px;
    color: #4a6986;
}

h3 {
    font-size: 1.1rem;
    margin: 0;
}

strong {
    font-weight: bolder !important;
    font-size: 1.1rem;
}

s {
    opacity: 0.5;
}

code {
    font-family: monospace;
    background-color: #dcdcdc;
    color: #000000;
    display: block;
    padding: 8px;
}

.red {
    color: #ff0000;
}

.blue {
    color: #0000FF;
}

.orange {
    color: #ffa500;
}

.green {
    color: #32cd32;
}

section > div {
    /*background-color: #e6e6e6;*/
    display: flex;
    flex-direction: row;
    gap: 8px;
    /*padding: 12px;*/
    font-size: 18px;
    padding-bottom: 2rem;
    /*border-bottom: 1px solid #e6e6e6;*/
}

section > div > * {
    /*border: 1px solid #333333;*/
    /*background-color: #e6e6e6;*/
    /*color: #ff0000;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*gap: 20px;*/
    /*padding: 8px;*/
    /*font-size: 18px;*/
    /*margin: 4px;*/
}

.emoji {
    font-size: 1.3rem;
}

table, th, td {
    border: 1px solid #333333;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
}

th {
    font-weight: bolder;
    font-size: 1.2rem;
}
```


これをDockerで動かすシェルスクリプトを用意

 例) `myMarp`


```bash
#!/usr/bin/env bash

######################################################
# marp を起動 cssは固定　markdown のあるディレクトリをマウント
######################################################

#echo "$PWD"/"$1"

docker run --name marp --rm --init \
 -v "$PWD"/"$1":/home/marp/app \
 -v  ~/marp.css:/home/marp/app/marp.css \
 -e LANG=$LANG \
 -p 8080:8080 \
 -p 37717:37717 \
 marpteam/marp-cli -s . \
 --theme my.css
# grep host ~/.ssh/config | awk '{print $2}'

```

markdown, cssがあるディレクトリに移動し

`myMqrp`

`http://localhost:8080` で 表示できる。

## Marpは使えるかどうか。

- 使うにはmarkdownの知識が絶対必須。
- 結局 html css も用意しないとそれなりのものは作れない。
- であれば普通にパワーポイントやGoogleSlideでも良さそうな。
- とは言えテキストベースなのでバージョン管理に向いている。
- 少人数で共有するだけであればMarpの方が早い。（テンプレートさえ然りしていれば）