---

title: "GatsbyJS で Blog 構築するための下地作り"
date: "2022-03-02 18:44:11"
post_modified: "2022-03-02 18:44:11"
description: "概要。 GatsbyJSのインストールからDeployまで"
categories: ["FrontEnd"]
tags: ["GatsbyJs", "TypeScript"]
topics: "GatsbyJs"
topic_order: "0"
draft: false

---

## 目的

GatsbyJS を使ってサイト構築するさいに最低限必要と思われる手順を記録

## 作業内容

- 環境構築
- GatsbyJS をインストールする (テーマ: Gatsby Starter Blog)
- GatsbyJS を Typescript 化
- ページを追加
- Prettier 導入
- Eslint 導入
- 記事のグループ化 (Tags) その他カテゴリーなども同様の手順
- Style を反映する (styled-components を導入)
- ページネーションを導入 (プラグインなし)
- おわりに

## 検証環境

- OS: Mac Monterey
- nodenv 1.4.0
- node: 14.19.0
- Gatsby: 4.8.0
- Editor: VSCode, Intellij IDEA
