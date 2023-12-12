---
title: "REST API"
date: "2022-02-23 01:52:41"
post_modified: "2022-02-23 01:52:41"
description: "REST API設計のための基本知識"
categories: ["BackEnd"]
tags: ["API"]
draft: false
---

## インターフェースの統一

| 処理  | HTTP メソッド | CRUD 操作 |
|-----|-----------|---------|
| 登録  | POST      | CREATE  |
| 取得  | GET       | READ    |
| 更新  | PUT       | UPDATE  |
| 削除  | DELETE    | DELETE  |
	
| コード | 状態                     | 説明                              |
|-----|------------------------|---------------------------------|
| 200 | OK                     | リクエストが正常に処理された                  |
| 201 | Created                | リクエストが正常に処理され、新規リソースが作成された      |
| 204 | No Content             | 更新の場合。リクエストが正常に処理されたが、返す新規情報はない |
| 400 | Bad Request            | サーバーが理解できない無効な要求である             |
| 401 | Unauthorized           | 要求されたリソースには認証が必要である             |
| 403 | Forbidden              | 要求されたリクエストは拒否された                |
| 404 | Not Found              | 要求されたリソースはサーバーに存在しない            |
| 405 | Method Not Allowe      | そのリソースに指定されたメソッドが用意されていない場合     |
| 406 | Not Acceptabl          | Accept ヘッダとマッチしない場合             |
| 409 | Conflict               | 作成しようとしたリソースが既にある場合             |
| 415 | Unsupported Media Type | データ形式は正しいがサーバが相手にしたくない場合。       |
| 500 | Internal Server Error  | サーバーでエラーが発生した                   |
| 503 | Service Unavailable    | 一時的にサービス提供ができない場合。（メンテナンス等）     |
