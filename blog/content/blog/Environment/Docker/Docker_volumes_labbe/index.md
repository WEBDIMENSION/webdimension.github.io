---
title: "Docker volumes label"
date: "2023-03-10 05:23:36"
post_modified: "2023-03-10 05:23:36"
description: "Docker volumes に Label をつけ永続化"
categories: ["Environment"]
tags: ["Docker", "Docker-compose", "Node"]
draft: false
---

## 当ブログの Docker-compose.ynl

```yml
...
volumes:
  - ./blog:/blog:delegated
  - /blog/.cache
  - /blog/build
  - /node_modules
  - /blog/public
...
```

ググれば host の node_modules と Containerの node_modules を同期させない情報はありそのまま使用してた。

ちなみに Dockerfile

```dockerfile
FROM node:18
RUN npm install -g gatsby-cli@4.5.2
WORKDIR /app
RUN npm install -g npm
```

この状況だと

初回 (Containerが生成されてない場合)

`docker-compose up -d`

で 立ち上げ

`docker-compse ecec xxx bash`
`yarn install`

で node_modules を Install してから

`yarn start`

でサービス起動する。

これだと

`docker-compose down`

をすると コンテナが消え次回

`docker-compose up -d`

して再度

`docker-compse ecec xxx bash`
`yarn install`

しなければならない。時間のムダ。。。。

## まずは Container 側の node_modules を volumes で永続化する

```yaml
services:
  gatsby:
    container_name: gatsby
    build: ./docker
    volumes:
      - ./blog:/blog:delegated
      #      - ../docker/package.json:/blog/package.json
      - /blog/.cache
      - /blog/build
      - node_volumes:/blog/node_modules
      - /blog/public
...
...
...
volumes:
  node_volumes:
    name: gatsby_blog_node_volumes
```

これで 初回だけ

`docker-compse ecec xxx bash`
`yarn install`

することにより node_modules は永続かされる。

だが、

`eocker volume purge`

すればこの volume は削除される。

## volumes に Label を付与、 purge から除外する

```yaml
services:
  gatsby:
    container_name: gatsby
    build: ./docker
    volumes:
      - ./blog:/blog:delegated
      #      - ../docker/package.json:/blog/package.json
      - /blog/.cache
      - /blog/build
      - node_volumes:/blog/node_modules
      - /blog/public
...
...
...
volumes:
  node_volumes:
    name: gatsby_blog_node_volumes
    labels:
      keep: true
```

volumes を prune するときは

`docker volume prune --filter "label!=keep"'`

めんどいので `alias` を設定

`dvp='docker volume prune --filter "label!=keep"'`

`dvp` を打つことにより 不要な volumes だけが削除されてさっぱり！。

## docker-compose.yml に 'yarn start'

```yaml
services:
  gatsby:
    container_name: gatsby
    build: ./docker
    volumes:
      - ./blog:/blog:delegated
      #      - ../docker/package.json:/blog/package.json
      - /blog/.cache
      - /blog/build
      - node_volumes:/blog/node_modules
      - /blog/public
    working_dir: /blog
    ...
    ...
    ...
    ...
    ...
    command: gatsby develop --host 0.0.0.0
```

これで

`docker-compose up -d`

で サービスが起動する。らくちん。

まぁ、

`gatsby develop --host 0.0.0.0`

なので ここは `develop mode` が起動するまでは多少時間がかかるが致し方ない。

サービスの起動は `lazydocker` 等で確認
