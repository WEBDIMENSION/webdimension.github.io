---
title: "OpenAPI の基本知識"
date: "2022-02-23 01:37:51"
post_modified: "2022-02-23 01:37:51"
description: "脱エクセル、OpenAPIでAPI設計"
categories: ["BackEnd"]
tags: ["API", "OpenAPI", "Docker", "Docker-compose"]
draft: false
---

## 基本構造

```yaml
openapi: 3.0.0
info: ...
servers: ...
paths: ...
components: ...
security: ...
tags: ...
externalDocs: ...
```

| field name  | Require | discription                                                                                                                        |
| ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| openap      | YES     | セマンティックなバージョニングを記述する。今回は 3.0.0 を用いる。詳しくはドキュメントを参照。                                      |
| info        | YES     | API のメタデータを記述する。                                                                                                       |
| server      |         | API を提供するサーバーを記述する。配列で複数記述可能(STG, PROD 等)。                                                               |
| path        | YES     | API で利用可能なエンドポイントやメソッドを記述する。                                                                               |
| component   | YES     | API で使用するオブジェクトスキーマを記述する。                                                                                     |
| securit     |         | API 全体を通して使用可能なセキュリティ仕様を記述する。(OAuth 等)                                                                   |
| tag         |         | API で使用されるタグのリスト。各種ツールによってパースされる際は、記述された順序で出力される。タグ名はユニークで無ければならない。 |
| externalDoc |         | 外部ドキュメントを記述する(API 仕様書等)。                                                                                         |

### info

| field name     | Require | discription                                               |
| -------------- | ------- | --------------------------------------------------------- |
| title          | YES     | API の名称。                                              |
| description    |         | API の簡潔な説明。CommonMark シンタックスが使える。       |
| termsOfService |         | API の利用規約。URL 形式でなければならない。              |
| contact        |         | コンタクト情報。(サポートページの URL やメールアドレス等) |
| license        |         | ライセンス情報。ライセンスページの URL も記述可能。       |
| version        | YES     | API ドキュメントのバージョン。                            |

### servers

```yaml
servers:
  - url: http://develop.local:8010/{api_version}
    description: Local API Server
    variables:
      api_version:
        default: "v2"
        enum:
          - "v1"
          - "v2"
```

| field name  | Require | discription          |
| ----------- | ------- | -------------------- |
| url         | YES     | API サーバーの URL。 |
| description |         | API サーバーの説明。 |
| variable    |         | API のバージョンなど |

### paths

```yaml
example.yaml
paths:
  # paths オブジェクト
  /users:
    # path item オブジェクト
    get: # GET
      # Operationオブジェクト
      tags:
        - users
      summary: Get all users.
      description: Returns an array of User model
      parameters: [ ]
      responses: # レスポンス定義
        '200': # HTTP status
          description: A JSON array of User model
          content:
            application/json: # レスポンスの形式指定
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User' # 参照するモデル
                example: # サンプルデータ
                  - id: 1
                    name: John Doe
                  - id: 2
                    name: Jane Doe
    post: # POST
      tags:
        - users
      summary: Create a new User
      description: Create a new User
      parameters: [ ]
      requestBody: # リクエストボディ
        description: user to create
        content:
          application/json:
            schema: # POSTするオブジェクト
              $ref: '#/components/schemas/User'
            example:
              id: 3
              name: Richard Roe
      responses:
        '201':
          description: CREATED
  /users/{userId}:
    get:
      tags:
        - users
      summary: Get user by ID.
      description: Returns a single User model
      parameters: # リクエストパラメータ
        - name: userId
          in: path # パラメータをパス内に含める
          description: user id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A single User model
          content:
            application/json:
              schema:
                type: object
                items:
                  $ref: '#/components/schemas/User'
                example:
                  id: 1
                  name: John Doe
```

| field name | discription                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| /{path}    | 各エンドポイントのパスを記述する。servers で定義した URL にこのパスを結合したものが最終的なエンドポイントとなる。 |

#### path item

| field name           | discription                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| summary              | エンドポイントのサマリ。                                                                |
| descriptions         | エンドポイントの簡潔な説明。CommonMark シンタックスを使用可能。                         |
| get, post, delete... | HTTP メソッドを定義。GET, PUT, POST, DELETE, OPTIONS, DELETE, PATCH, TRACE が使用可能。 |

### components

- schemas: User や Product 等のモデル
- requestBodies: リクエストボディ
- responses: API レスポンス
- headers: リクエストヘッダ
- parameters: リクエストパラメータ

```yaml
components:
  schemas: # スキーマオブジェクトの定義
    User: # モデル名
      type: object # 型
      required: # 必須フィールド
        - id
      properties:
        id: # プロパティ名
          type: integer # 型
          format: int64 # フォーマット(int32, int64等)
        name:
          type: string
    Product:
      type: object
      required:
        - id
        - price
      properties:
        id:
          type: integer
          format: int64
          example: 1
        name:
          type: string
          example: Laptop
        price:
          type: integer
          example: 1200
```

### security

```yaml
security:
  # Non-OAuth setting
  - api_key: []
  # OAuth setting
  - users_auth:
      - write:users
      - read:users
```

### tags

```yaml
tags:
  - name: users
    description: Access to Users
  - name: products
    description: Access to Products
```

| field name   | Require | discription      |
| ------------ | ------- | ---------------- |
| name         | YES     | タグ名称。       |
| description  |         | タグの説明。     |
| externalDocs |         | 外部ドキュメント |

### externalDocs

```yaml
description: Find more info here
url: https://example.com
```

| field name  | discription |
| ----------- | ----------- | ------------------------ |
| description |             | 外部ドキュメントの説明。 |
| url         | YES         | 外部ドキュメントの URL。 |
