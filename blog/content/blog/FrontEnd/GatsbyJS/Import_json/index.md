---

title: "GatsbyJs で json ファイルを インポート"
date: "2022-03-03 08:14:44"
post_modified: "2022-03-03 08:14:44"
description: "GatsbyJs で json ファイルをインポートして GraphQL から取得"
categories: ["FrontEnd"]
tags: ["GatsbyJS"]
draft: false

---

## Data ファイル作成

`src/data/topics./json` を作成

```json
[
  {
    "title": "GatsbyJS のインストールから Deploy するまで",
    "description": "TypeScript化, ESLint, Prettier, Grouping(Tags), CSS, ページネーション, 問い合わせフォーム、GitHubActions, その他",
    "url": "/blog/topics/gatsby-js"
  }
]
```

## プラグインインストール

```bash
yarn add gatsby-transformer-json
```

## プラグイン有効化

`gatsby-config.js` に追記

```js
`gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `data`,
      path: `${__dirname}/src/data/`,
    },
  }
```