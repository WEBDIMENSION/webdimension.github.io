---

title: "GatsbyJS で 初回表示、リロード時にスタイルが崩れる"
date: "2022-03-04 06:42:07"
post_modified: "2022-03-04 06:42:07"
description: "GatsbyJS で 初回表示、リロード時にスタイルが崩れるときは設定もれかも。gatsby-plugin-styled-componentsを追加で解決"
categories: ["FrontEnd"]
tags: ["GatsbyJS"]
draft: false

---

GatsbyJS で

```bash
yarn start
```

でのプレビューは問題ないのだけれど本番環境

```bash
yarn build
yarn serve
```

でのプレビュー時は初回表示、リロード時に表示が崩れる現象が発生。  
リンクを辿るときは正常な表示。

ページ構成としてこのような感じ

```html

<body>
<container>
    <header></header>
    <content>
        <main></main>
        <sidebar></sidebar>
    </content>
    <footer></footer>
</container>
</body>
```

レスポンシブ対応として[MUI(Material-UI)](https://mui.com)の`<Grid>`を使っている。  
表示崩れが起こるのは `<main></main>`の部分。

[MUI(Material-UI)](https://mui.com)が悪さしていると思い原因調査でやったこと

- `<Grid>`を無効
- `<box>` を無効
- googleAdsense コメントアウト
- {children} を無効

状況変わらず。 [MUI(Material-UI)](https://mui.com)は原因ではないと推測。

`styled-components` を疑う。

## 原因

設定ミス。

```bash
yarn add styled-components
yarn add @types/styled-components
```

だけでなく

```bash
yarn add gatsby-plugin-styled-components
```

も必要だった。

### `gatsby-plugin-styled-components`の有効化

`gatsby-config.js` に追記

```js
plugins: [
  `gatsby-plugin-styled-components`,
]
```

## 諸惑

部分的な表示崩れのため部分的な原因かと思いきや全体設定の漏れ。  
ちょっと時間をとってしまった。 こういうのも慣れていくしかないか・・・
