---
title: "npm run watch(build時) でLint実行 - Laravelでの開発の前準備8"
date: "2020-02-15 20:33:52"
post_modified: "2020-02-15 20:33:52"
description: "npm run xxx の Build時に Eslint, Stylelintも実行しスパルタンな設定をしてみる。"
categories: ["BackEnd"]
tags: ["Npm", "Laravel", "Vue.js", "Stylelint"]
topics: "laravel"
topic_order: "8"
draft: false
---

# npm run watch(build 時) で Lint 実行 - Laravel での開発の前準備 8

## webpack (laravel-mix) への設定追加

webpack.mix.js

```bash
const styleLintPlugin = require('stylelint-webpack-plugin');

if (!mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      // eslint-disable-next-line new-cap
      new styleLintPlugin({
        files: [
          './resources/sass/app.scss',
        ],
        // eslint-disable-next-line no-undef
        configFile: path.join(__dirname, '.stylelintrc'),
        syntax: 'scss',
        options: {
          fix: false
        }
      }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
          test: /\.(js|vue)?$/,
          options: {
            fix: false
          }
        }
      ]
    }
  })
}
```

対象のファイル css

```bash
        files: [
          './resources/sass/app.scss',
        ],
```

対象の js ファイル(.js, .vue を指定)

```bash
          test: /\.(js|vue)?$/,
```

警告を出すだけで自動整形はしない
'true'にすれば自動整形

```bash
          options: {
            fix: false
          }
```

Build 時の自動整形はなんか怖いので自動整形しない設定にしてます。

漏れなくコーディングチェックできます。
