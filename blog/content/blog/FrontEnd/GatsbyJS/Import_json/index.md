# GatsbyJs で json ファイルを インポート

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