---
title: "UML (シーケンス図)"
date: "2023-03-18 06:23:25"
post_modified: "2023-03-18 06:23:25"
description: "Markdown で PlantUML、シーケンス図"
categories: ["Tools"]
tags: ["UML", "Markdown"]
draft: false
---

## UML (クラス図)

ちょっとの間離れるとすぐ忘れてしまうので備忘録として。。。

基本的な書き方だけ。

参考

[PlantUMLによるシーケンス図の書き方【メッセージやノートなど】](https://applis.io/posts/plantuml-sequence-diagram)

### メッセージ

```puml
@startuml
participantA -> participantB : A->Bのメッセージ
participantA <- participantB : B->Aのメッセージ
participantB -> participantB : B->Bのメッセージ
participantB <-> participantC : B<->Cのメッセージ
@enduml
```

### メッセージの色

```puml
@startuml
participantA -> participantB : A->Bのメッセージ
participantA <- participantB : B->Aのメッセージ
participantB -[#0000ff]> participantB : B->Bのメッセージ
participantB <-[#red]> participantC : B<->Cのメッセージ
@enduml
```

### メッセージの番号

```puml
@startuml
autonumber
participantA -> participantB : A->Bのメッセージ
participantA <- participantB : B->Aのメッセージ
autonumber 10
participantB -> participantB : B->Bのメッセージ
participantB <-> participantC : B<->Cのメッセージ
autonumber stop
participantA <- participantC : C->Aのメッセージ
autonumber resume
participantA -> participantB : A->Bのメッセージ

@enduml
```

### 分類子の種類

```puml
@startuml
participant Participant
actor Actor
boundary Boundary
control Control
entity Entity
database Database
collections Collections
queue Queue
@enduml
```

### 分類子の名前

```puml
@startuml
actor ユーザー as User
participant サーバー as Server
User -> Server : アクセス
@enduml
```

### 分類子の背景色

```puml
@startuml
actor ユーザー as User
participant サーバー as Server  #dedede
User -> Server : アクセス
@enduml
```

### 分類子のグループ化

```puml
@startuml
actor ユーザー as User
box Internal Service #eeeeee
participant WEBサーバー as WebServer  #dedede
participant DBサーバー as DBServer  #dedede
end box
User -> WebServer : アクセス
WebServer -> DBServer : SQL問い合わせ
WebServer <- DBServer : 問い合わせ結果
User <- WebServer : ページ表示
@enduml
```

### ノート

```puml
@startuml
actor ユーザー as User
box Internal Service #eeeeee
participant WEBサーバー as WebServer  #dedede
participant DBサーバー as DBServer  #dedede
end box
User -> WebServer : アクセス
note left
動的ページへアクセス
end note
WebServer -> DBServer : SQL問い合わせ
WebServer <- DBServer : 問い合わせ結果
User <- WebServer : ページ表示
note right
結果表示
end note
@enduml
```

### ノートの背景色

```puml
@startuml
actor ユーザー as User
User -> Server : アクセスする
note left  #aqua : ユーザーのアクション
@enduml
```

### リファレンスの書き方

```puml
@startuml
actor ユーザー as User
participant サーバー as Server
User -> Server : アクセスする
ref over User : ユーザーの上に表示する
User -> Server : 認可用URLを提示する
ref over User, Server
  ユーザー・サーバーに またがって表示する
end ref
@enduml
```

### ライフライン

```puml
@startuml
actor ユーザー as User
participant WebServer
database DBServer

activate WebServer
  User -> WebServer : アクセスする
  activate DBServer #ffaaaa
    WebServer -> DBServer : SQL発行 
    DBServer -> WebServer : 結果 
    deactivate DBServer
  WebServer -> User : 画面を表示する
  destroy WebServer
@enduml
```

### ショートカット

```puml
@startuml
actor ユーザー as User
participant WebServer as WebServer
database DBServer as DBServer

User -> WebServer ++ : アクセスする
WebServer -> DBServer ++ : SQL発行 
DBServer -> WebServer -- : 結果 
WebServer -> User -- : 画面を表示する
@enduml
```

### 区切り線

```puml
@startuml
actor ユーザー as User

User -> server : アクセスする
== 区切り線 ==
User <- server : なにか。。。 
@enduml
```

### 遅延

```puml
@startuml
actor ユーザー as User

User -> WebServer : アクセスする
WebServer -> DBServer ++ : SQL発行 
DBServer -> WebServer -- : 結果 
... 5 minutes later ...
WebServer -> User -- : 画面を表示する
@enduml
```

### 文字の装飾

```puml
@startuml
actor ユーザー as User
User -> WebServer : アクセスする
note left User
=== 文字の装飾
* **太字**
* __下線__
* <color #red>色の変更</color>
end note
@enduml
```

## 改行

```puml
@startuml
actor ユーザー as User
User -> Server : ここで改行\n改行しまいした
@enduml
```
