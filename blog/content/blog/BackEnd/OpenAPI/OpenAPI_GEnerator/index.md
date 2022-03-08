---
title: "OpenAPI-Generatorの環境をDockerで構築"
date: "2022-02-23 01:43:47"
post_modified: "2022-02-23 01:43:47"
description: ""
categories: ["BackEnd"]
tags: ["API", "OpenAPI", "Prism", "Docker", "Docker-compose"]
draft: false
---

## openapi generator

**OPENAPI** の yml から Format を生成。

```bash
openapi-generator-cli generate -g openapi -i src/root.yml -o generated/openapi
# -g <formatName>
```

`src/root.yml`から openapi.json を生成。  
生成された openapi.json (openapi.yaml でも可)を Prism(mock server)に読み込ませる。

```bash
npm run watch
```

により yaml の変更を追従し再生成。

[Generators List](https://openapi-generator.tech/docs/generators/)

### Dockerfile

**Require JAVA**
java ベースの DockerImage のため別途 `node` `npm` を別途インストール

```yaml
FROM openjdk:11-slim

RUN apt-get -y update
RUN apt-get -y install nodejs
RUN apt-get -y install npm

  # 環境変数がないとErrorになる
ENV SHELL /bin/sh

WORKDIR /app

COPY package.json ./
RUN npm install
```

### package.json

```json
{
  "name": "structured-openapi-schema",
  "scripts": {
    "generate:schema_json": "schema_json",
    "generate:schema_yaml": "schema_yaml",
    "generated:schema_markdown": "schema_markdown",
    "generated:schema_html2": "schema_html2",
    "schema_json": "openapi-generator-cli generate -g openapi -i src/root.yml -o generated/openapi",
    "schema_yaml": "openapi-generator-cli generate -g openapi-yaml -i src/root.yml -o generated",
    "schema_markdown": "openapi-generator-cli generate -g markdown -i src/root.yml -o generated/markdown",
    "schema_html": "openapi-generator-cli generate -g html -i src/root.yml -o generated/html",
    "schema_html2": "openapi-generator-cli generate -g html2 -i src/root.yml -o generated/html2",
    "schema_dynamic-html": "openapi-generator-cli generate -g dynamic-html -i src/root.yml -o generated/dynamic_html",
    "schema_plantuml": "openapi-generator-cli generate -g plantuml -i src/root.yml -o generated/plantuml",
    "generate": "npm-run-all -s generate:*",
    "clean": "rimraf generated/*",
    "build": "npm-run-all -s clean generate",
    "watch": "chokidar 'src/root.yml' 'src/**/*.yml' -c 'npm run schema_yaml' --initial"
  },
  "devDependencies": {
    "@openapitools/openapi-generator-cli": "^2.4.18",
    "chokidar-cli": "^3.0.0",
    "npm-run-all": "^4.1.5",
    "rimraf": "^3.0.2"
  }
}
```

`npm run watch` で

- openapi.json
- openapi.yaml
- markdown

を生成するように設定。  
他の `dynamic-html' を生成する場合は

```bash
docker-compose exec openapi npm run schema_dynamic-html
```

## prim

上記で生成された `openapi.json` (openapi.yaml でも可)から mock server を起動。

```bash
# -d によりデータを自動生成
'mock -h 0.0.0.0 -d ${path_for_yaml_or_json}'
```

### dockerfile

```yaml
FROM stoplight/prism
```

## Docker-compose

```yaml
prism:
  build: ./docker/prism
  container_name: ${PRISM_CONTAINER_NAME}
  command: "mock -h 0.0.0.0 -d /app/dist.json"
  volumes:
    - ${DIR}/dist/dist.json:/app/dist.json
  ports:
    - "${PRISM_CLIENT_PORT}:4010"

openapi:
  build: ./docker/openapi
  container_name: openapi
  volumes:
    - ${DIR}/generated:/app/generated
    - ${DIR}/src:/app/src
    - ${DIR}/docker/openapi/package.json:/app/package.json
  tty: true
```
