---

title: "GatsbyJS の CI/CD"
date: "2022-03-02 20:46:36"
post_modified: "2022-03-02 20:46:36"
description: "GatsbyJS の CI/CD。GitHub Actionを使用してGitHub Pageへデプロイ。独自ドメイン設定"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "100"
draft: false

---


問い合わせフォームは[FlexyForm](https://www.flexyform.com)を選定したので Deploy 先のホスティングサービスは限定されずにすむ。

せっかくなので GitHub Actions を設定して簡易的な CI/CD を導入する。

## GatsbyJS の Deploy 前提

- GitHub レポジトリ使用
- GitHub Actions 使用
- Deploy 先は GitHub Page 使用
- 独自ドメインでアクセスできるようにする blog.xxxxxx.com のようにサブドメインを設定する。

## GitHub Actions の設定

workflow を作成  
今回は `dploy.yml` とする。  
トップディレクトリから
`.github/workflows/deploy.yml` を新規作成  
ちなみに `.github/README.md` を作成すればレポジトリの README として扱われる。

`.github/workflows/deploy.yml`

```yml
name: Deploy

on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: "14.x"

      - name: Install Yarn
        run: npm install -g yarn

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ~/.cache/yarn
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install dependencies
        run: yarn install
        working-directory: ./

      - name: Run build
        if: ${{ github.ref == 'refs/heads/master' }}
        env:
          SITE_URL: ${{secrets.SITE_URL}}
        run: yarn build
        working-directory: ./

      - name: Deploy
        if: ${{ !env.ACT && github.ref == 'refs/heads/master'}}
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public

      - name: ls public Dir
        run: ls -la public
        working-directory: ./
```

## GitHub レポジトリの設定

- レポジトリ名は YOUR_ACCOUNT.github.io にする。
- project を master に push する
- GitHub Actions が起動する
- GitHub Pages の設定画面で branch のプルダウンから gh-pages を選択
- Deploy 後は YOUR_ACCOUNT.github.io でアクセスできる

## 独自ドメイン設定

DNS レコードの CNAME で対応する

| エントリ名 | タイプ | データ                 |
| ---------- | ------ | ---------------------- |
| blog       | CNAME  | YOUR_ACCOUNT.github.io |

GitHub Pages の設定画面の Custom domain で blog.xxxx.com (Your domain) を設定

SSL (Let's Encrypt) の反映等少々時間を要す。
