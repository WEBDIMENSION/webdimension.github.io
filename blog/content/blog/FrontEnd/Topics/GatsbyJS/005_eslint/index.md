---

title: "GatsbyJS に ESLint を導入"
date: "2022-03-02 20:30:01"
post_modified: "2022-03-02 20:30:01"
description: "GatsbyJSにESLintを導入しコードの品質を保つ"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "5"
draft: false

---

## 環境設定

- VSCode に ESlint の Plugin Install 他のエディタの場合も同様に

## ESlint を Pruject に Install

### Install modules

```bash
yarn add -D eslint eslint-loader
```

### ESlint 設定アイルを生成

```bash
yarn run eslint --init

------------------------------------
  To check syntax only
> To check syntax and find problems
  To check syntax, find problems, and enforce code style
------------------------------------
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
------------------------------------
> React
  Vue.js
  None of these
------------------------------------
>(*) Browser
 ( ) Node
------------------------------------
 JavaScript
  YAML
> JSON
------------------------------------
eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
? Would you like to install them now with npm? (Y/n) y
------------------------------------
```

## 設定ファイル

.eslint.json

```json
{
  "env": {
    "browser": true
  },
  "globals": {
    "__PATH_PREFIX__": true,
    "___emitter": false
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {}
}
```
