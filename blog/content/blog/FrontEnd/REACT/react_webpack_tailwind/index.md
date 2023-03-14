---
title: "React Typescript webpack tailwind"
date: "2023-03-12 20:34:03"
post_modified: "2023-03-12 20:34:03"
description: "Create React App を使わず React TypeScript をインストール"
categories: ["FrontEnd"]
tags: ["Docker-conpoe", "Docker", "React.js", "TypeScript"]
topics: ""
draft: false
---


## React webpack tailwind 

CRA(Create React App) で Install した React は `craco` を Install したり prod は `tailwind` が効かなかったり
将来的には非推奨？という声もあったりでピュアなReact ts をインストールした備忘録。

### Dockerfile

```Dockerfile
FROM node:18.15.0-alpine
RUN npm install -g npm@9.6.1
RUN npm install -g serve
WORKDIR /app
```

### Docker-compose.yml

```yml
...
...
...
react:
build: ./react
container_name: ${COMPOSE_PROJECT_NAME}_react
volumes:
  - ${DIR_PATH}/react/app:/app:delegated
environment:
  CHOKIDAR_USEPOLLING: "true"
  WDS_SOCKET_PORT: 0
  WDS_SOCKET_HOST: 0.0.0.0
  REACT_APP_WDS_SOCKET_HOST: 0.0.0.0
  REACT_APP_WDS_SOCKET_PORT: 0
  PORT: ${REACT_CLIENT_PORT}
ports:
  - "8080:8080"
  - "80:80"
command: /bin/sh -c "serve -l 80 -s dist"
working_dir: /app
stdin_open: true
tty: true
depends_on:
...
...
...

```

### .env

```.env
REACT_CLIENT_PORT=8080
```

### Install  react webpack

```bash
yarn init -y
yarn add react react-dom
yarn add -D webpack webpack-cli webpack-dev-server
```

### Istall TypeScript

```bash
yarn add -D typescript ts-loader
yarn add -D @types/react @types/react-dom @types/node
```

### Install tailwind

```bash
yarn add -D tailwindcss postcss-cli autoprefixer css-loader style-loader postcss-loader
yarn tailwind init
```

### webpack.config.js

```js
// pathモジュールの読み込み
const path = require("path");

module.exports = {
    // モードを開発モードにする
    mode: "development",
    // 入力ファイル設定
    entry: [path.resolve(__dirname, "./src/index.tsx")],
    // 出力ファイル設定
    output: {
        // 出力されるファイル名
        filename: "bundle.js",
        // 出力先ディレクトリ
        path: path.resolve(__dirname, "dist")
    },

    // モジュール設定
    module: {
        rules: [
            {
                // ts-loaderの設定
                test: /\.(js|ts|tsx)?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
 +           {
 +               test: /\.s?css$/,
 +               use: [
 +                   'style-loader',
 +                   { loader: 'css-loader', options: { importLoaders: 1 } },
 +                   'postcss-loader',
 +               ],
 +           },
        ]
    },
    // モジュール解決
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    // 開発モード設定
    devtool: "source-map",
    devServer: {
    //     contentBase: path.join(__dirname, "dist"),
        static: {
            directory: path.resolve(__dirname, "./dist"),
        },
        host: '0.0.0.0',
        hot: true,
        open: true,
        port: 8080,
    },
    // devServer: {
    //     static: {
    //         directory: path.resolve(__dirname, "./dist"),
    //     }
//    contentBase: "./dist"
//     },
+   target: ["web"],
};

```

### tsconfig.json

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "types":["node"],
    "lib": [
      "es2019",
      "dom"
    ],
    "allowJs": true, // jsコンパイル用
    "checkJs": true,  // js簡易型チェック
    "sourceMap": true,
    "inlineSources": true,
    "outDir": "./dist/",
    "noImplicitAny": true,
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  }
}
```

### postcss.config.js

```js
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
```

### index.tsx

```js
import React from "react";
import ReactDOM from "react-dom";
 
// コンポーネント読み込み
import App from "./components/App";
 
 
ReactDOM.render(<App />, document.getElementById("root"));
```

### src/components/App.tsx

```js
import React, { Component } from 'react';
 
class App extends Component {
  render() {
    return (
            <div>
                <p className="text-6xl">Hello, World!</p>
            </div>

    )
  }
}
 
export default App;
```

### dist/index.html

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

### Command

#### dev server

```bash
yarn webpack-dev-server
```

#### build

```bash
yarn run webpack
```

### package.json

```json
{
  "name": "app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "yarn webpack"
  },
  "devDependencies": {
    "@types/node": "^18.15.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "autoprefixer": "^10.4.14",
    "css-loader": "^6.7.3",
    "postcss": "^8.4.21",
    "postcss-cli": "^10.1.0",
    "postcss-loader": "^7.0.2",
    "style-loader": "^3.3.1",
    "tailwindcss": "^3.2.7",
    "ts-loader": "^9.4.2",
    "typescript": "^4.9.5",
    "webpack": "^5.76.1",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
}
```
