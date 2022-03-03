---
title: "GatsbyJS で Production build 時に console.log() を消す"
date: "2022-03-03 06:00:08"
post_modified: "2022-03-03 06:00:08"
description: "GatsbyJs で plugin gatsby-plugin-remove-console をインストール"
categories: ["FrontEnd"]
tags: ["GatsbyJs"]
topics: ""
draft: true
---

本番デプロイ (Production build) に console.log(hoge)を消したい。  
React.js や Vue.js では

- terser-webpack-plugin
- uglifyjs-webpack-plugin

を `webpack.config.js`に設定する。

これを ***GatsbyJS*** にも導入したいと思いしらべたらやはりあった。  
設定は至ってかんたん。

## GatsbyJS に gatsby-plugin-remove-console をインストール

```bash
yarn add gatsby-plugin-remove-console && yarn add babel-plugin-transform-remove-console --dev
```

`gatsby-plugin-remove-console` の 反映

`gatsby-config.js` に追記

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-remove-console',
      options: {
        exclude: ['error', 'warn'], // <- will be removed all console calls except these
      }
    }
  ]
};
```