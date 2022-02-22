---
title: "DockerHubへ自作Docker-ImageをPush"
date: "2022-02-23 00:35:37"
post_modified: "2022-02-23 00:35:37"
description: "コンテナからDocekrImageを生成しDockerHubへPush"
categories: ["Environment"]
tags: ["Docker", "Docker Registry"]
draft: false
---

## Create Image

```bash
# docker tag [IMAGE ID] [自分のDockerID]/[Dockerイメージ名]:[タグ]
docker tag 3e7c8f8edcde webdimension/almalinux8_systemd_lamp:latest
```

| 項目                | 内容                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| IMAGE ID 　         | 　「docker image ls」コマンドで確認した IMAGE ID                                               |
| 自分の DockerID 　  | 　 DockerHub にログインした際のユーザ名                                                        |
| Docker イメージ名　 | 　リポジトリとして登録したい名前（元のリポジトリ名にしておくとわかりやすい）                   |
| タグ　              | 　バージョンと考えてよいでしょう。最新バージョンという意味にしたい場合は「latest」と付けます。 |

## Push Image

```bash
# docker push [自分のDockerID]/[Dockerイメージ名]:[タグ]
docker push webdimension/almalinux8_systemd_lamp:latest
```

## コンテナからイメージ作成

```bash
docker commit <コンテナID> <イメージネーム>
docker commit a93beb6ac6e3 almalinux8_systemd_lamp
docker commit 7adac8d7981a almalinux8_systemd_lamp
```
