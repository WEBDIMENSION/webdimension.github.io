---

title: "GatsbyJS Install & Git 設定"
date: "2022-03-02 20:15:50"
post_modified: "2022-03-02 20:15:50"
description: "GatsbyJsをインストールしてGitHubへ初回Pushするまで"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "1"
draft: false

---

## Install

インストール済み

- nodenv
- yarn

```bash
# Install node
nodev install 14.19.0
# localへ反映
nodenv local 14.19.0
# Install Gatsby
npm install  -g gatsby-cli
# Install Gatsby Blog-starter
gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
```

## UP Develop server

```bash
cd blog
yarn start

# ブラウザで確認
# Default http://localhost:8000
```

## 自分の GitRepository で管理する

### 既存の設定削除

```bash
rm -rf .git
```

### GitHub 等々でリポジトリを作成・設定

```bash
# Repository 追加
git remote add origin git@github.com:<YOUR_ACCOUNT>/<REPOSITORY_NAME>.git

# Master Branch を main に
git branch -M main

# Commit
git add .
git commit -m 'Installed gatsby'
# Push
git push -u origin main
```
