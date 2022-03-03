---
title: "webpack - Laravelでの開発の前準備6"
date: "2020-02-15 19:14:52"
post_modified: "2020-02-15 20:04:00"
description: "Laravel-mix (webpack) で Build, Watch をしてみる"
categories: ["BackEnd"]
tags: ["Laravel", "Webpack"]
topics: "laravel"
topic_order: "6"
draft: false
---

# webpack - Laravel での開発の前準備 6

## Laravel mix (webpack) をざっくり理解する

設定ファイルは webpack.js

```bash
('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');
```

- resources/js/app.js を Build して public/js に配置
  (pblic/js/app.js)
- resources/sass/app.scss を build して public/css に配置
  (pblic/css/app.css)

### ファイルを追加する場合

```bash
('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css');
  mix.js('resources/js/admin.js', 'public/js')
    .sass('resources/sass/admin.scss', 'public/css');
```

- pblic/js/admin.js
- pblic/css/admin.css

が生成される。

## package.json 　を見てみる

```bash
    "scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
        "eslint": "eslint ./resources/js/*/*/*.vue ./resources/js/*.js ./resources/js/*/*.vue ",
        "eslint-fix": "eslint ./resources/js/*/*/*.vue ./resources/js/*.js ./resources/js/*/*.vue --fix",
        "stylelint": "stylelint ./resources/sass/player.scss ./resources/sass/admin.scss",
        "stylelint-fix": "stylelint ./resources/sass/player.scss ./resources/sass/admin.scss --fix",
        "test": "mocha-webpack --webpack-config=node_modules/laravel-mix/setup/webpack.config.js --require tests/Javascript/setup.js tests/Javascript/**/*.spec.js"
    },
```

```bash
npm run dev
```

'npm run development'への alias

```bash
npm run development
```

開発モードで Build

```bash
npm run watch
```

ファイルに変更があれば変更を感知し開発モードで Build フロント作業はほぼ実行しっぱなし。

```bash
npm run watch-poll
```

上記 npm watch を vagrant など VirtualBox 上で行う場合はこちら
(パーミッションなどの問題らしい)

```bash
npm run prod
```

'npm run production'への alias

```bash
npm run production
```

プロダクトモードで Build
(ガチな Build)

```bash
npm run hot
```

使ったことない。

開発のモードの Build とプロダクトモードの違いは生成される js,css をみれば一目瞭然。

## npm run watch 実行してみる

### Command から実行

```bash
npm run watch
```

結果 成功例

```bash
 DONE  Compiled successfully in 18120ms                                                                                                                                                                                         19:02:47

          Asset      Size      Chunks             Chunk Names
   /css/app.css   196 KiB     /js/app  [emitted]  /js/app
     /js/app.js  1.39 MiB     /js/app  [emitted]  /js/app
```

### IDE で実行

例 Intellij IDEA

[option]{.kbd} + [F11]{.kbd}

![](images/Screen-Shot-2020-02-15-at-19.08.22.png)

実行結果

![](images/Screen-Shot-2020-02-15-at-19.07.26.png)
