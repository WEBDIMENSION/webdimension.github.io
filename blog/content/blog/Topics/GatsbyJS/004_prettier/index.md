---

title: "GatsbyJS に Prettiew を導入"
date: "2022-03-02 20:30:01"
post_modified: "2022-03-02 20:30:01"
description: "GatsbyJSにESLintを導入しコードの品質を保つ"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "4"
draft: false

---

## 環境設定

- VSCode に Prettier の Plugin Install 他のエディタの場合も同様に

## 設定ファイル

`.prettierrc`

```json
{
  "arrowParens": "avoid",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120,
  "semi": false
}

```

## 保存時に Prettier で format をする

### VSCode

`.vscode/setting.json`

```json
{
  "editor.formatOnSave": true
}
```

### Intellij IDEA

Preferences | Languages & Frameworks | JavaScript | Prettier

On save のチェックボックスをON

