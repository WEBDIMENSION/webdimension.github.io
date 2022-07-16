---
title: "Docker Image を GitHubAction からGHCR (GitHub Container Repository) へPush"
date: "2022-03-06 19:16:20"
post_modified: "2022-03-06 19:16:20"
description: "GitHub Actions 内で Dockerfile をもとに Build し GHCR (GitHub Container Repository) へPush。
今後の可能性を多々感じる。アイデア次第でとても効率的に。"
categories: ["Infrastructure"]
tags: ["GitHub", "GitHub Actions", "ghcr.io"]
draft: false
---

## GitHub レポジトリ作成

- .gitignore 設置 (任意)
- .GitHub/workflows/build.yml 設置 (空でよい)
- 初期コミット、Push をしておく。

## PERSONAL_ACCESS_TOKEN が必要なので発行する

- GitHub 個人の設定の `Settings` -> `Developer settings` -> `Personal access tokens`

この値をメモる

## PERSONAL_ACCESS_TOKEN を Secret に設定する

- `Repository` -> `Settings` -> `Secret`  
  pullDown の `actions` を 選択  
  ここで任意の名前で設定する (ここでは `PERSONAL_ACCESS_TOKEN` で 設定)

## USERNAME を Secret に設定する

workflow の 下記

```yml
ghcr.io/${{ secrets.USERNAME }}/${{ env.IMAGE_NAME }}:latest
```

`アカウント名は lowercase でないといけない` と怒られるので明示的に secrets へ小文字でアカウント名を登録

- `Repository` -> `Settings` -> `Secret`  
  pullDown の `actions` を 選択  
  ここで任意の名前で設定する (ここでは `USERNAME` で 設定)

## GitHub Actions workflow を作成

[参考](https://qiita.com/kawakawaryuryu/items/b0291c1bc1141a535263)

`.github/workflows/build.yml`

```yml
name: Build and Publish Docker

on:
  push:
    branches:
      - main

jobs:
  build_and_push:
    runs-on: ubuntu-latest
    env:
      IMAGE_NAME: linkchecker
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PERSONAL_ACCESS_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: ./
          push: true
          tags: |
            ghcr.io/${{ secrets.USERNAME }}/${{ env.IMAGE_NAME }}:latest
            ghcr.io/${{ secrets.USERNAME }}/${{ env.IMAGE_NAME }}:1.0.0

```

## レポジトリへプッシュ

```bash
git poush origin main
```

Build がうまく行けば `https://github.com/<<YOUR_ACCOUNT>>?tab=packages` に DockerImage が生成されている
