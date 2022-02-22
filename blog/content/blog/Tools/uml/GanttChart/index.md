---
title: "UML"
date: "2022-02-23 04:48:52"
post_modified: "2022-02-23 04:48:52"
description: "Markdown でガントチャート"
categories: ["Tools"]
tags: ["UML", "Markdown"]
draft: false
---

## Template

```puml
project starts the 2019/06/01
saturday are closed
sunday are closed
-- ▼ Infrastructure ▼--
[プロトタイプを設計] lasts 14 days
[プロトタイプをテスト] lasts 4 days
[プロトタイプをテスト] starts at [プロトタイプを設計]'s end
[プロトタイプを設計] is colored in Fuchsia/FireBrick
[プロトタイプをテスト] is colored in GreenYellow/Green
-- ▲ Infrastructure ▲--
-- ▼ Repository ▼--
[プロトタイプを設計1] lasts 14 days
[プロトタイプをテスト1] lasts 4 days
[プロトタイプをテスト1] starts at [プロトタイプを設計1]'s end
-- ▲ Repository ▲--
-- ▼ Customize ▼--
[プロトタイプを設計2] lasts 14 days
[プロトタイプをテスト2] lasts 4 days
[プロトタイプをテスト2] starts at [プロトタイプを設計2]'s end
-- ▲ Customize ▲--
-- ▼ Design ▼--
[プロトタイプを設計3] lasts 14 days
[プロトタイプをテスト3] lasts 4 days
[プロトタイプをテスト3] starts at [プロトタイプを設計3]'s end
-- ▲ Design ▲--
```

## Example

### タスクの登録

```puml
[基本設計を考える] lasts 10 days
```

### タスクの順序

```puml
[基本設計を考える] lasts 10 days
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
```

### タスクの色

```puml
project starts the 2018/07/26
[基本設計を考える] lasts 10 days and is colored in Fuchsia/FireBrick
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
```

### カレンダー表示

```puml
project starts the 2018/07/26
[基本設計を考える] lasts 10 days and is colored in Fuchsia/FireBrick
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
```

### 休業日の指定

```puml
project starts the 2018/07/26
saturday are closed
sunday are closed
2018/07/31 is closed
[基本設計を考える] lasts 10 days and is colored in Fuchsia/FireBrick
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
```

### マイルストーンの設定

```puml
project starts the 2018/07/26
saturday are closed
sunday are closed
2018/07/31 is closed
[基本設計を考える] lasts 10 days and is colored in Fuchsia/FireBrick
[上司へ報告] happens at [基本設計を考える]'s end
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
```

### セパレーターの設置

```puml
project starts the 2018/07/26
saturday are closed
sunday are closed
2018/07/31 is closed
[基本設計を考える] lasts 10 days and is colored in Fuchsia/FireBrick
[上司へ報告] happens at [基本設計を考える]'s end
[基本設計資料を作る] lasts 3 days
[基本設計を考える] -> [基本設計資料を作る]
-- ↑基本設計 --
[詳細設計を考える] lasts 5 days
[詳細設計資料を作る] lasts 6 days
[基本設計資料を作る] -> [詳細設計を考える]
[詳細設計を考える] -> [詳細設計資料を作る]
-- ↑詳細設計 --
```

### タスクの定義

```puml
[プロトタイプを設計] lasts 15 days
[プロトタイプをテスト] lasts 10 days
```

### 依存関係

```puml
[プロトタイプを設計] lasts 15 days
[プロトタイプをテスト] lasts 10 days
[プロトタイプをテスト] starts at [プロトタイプを設計]'s end
```

```puml
[プロトタイプを設計] lasts 10 days
[プロトタイプを実装] lasts 10 days
[テストを実装] lasts 5 days
[プロトタイプを実装] starts at [プロトタイプを設計]'s end
[テストを実装] starts at [プロトタイプを実装]'s start
```

### エイリアス

```puml
[プロトタイプを設計] as [設計] lasts 15 days
[プロトタイプをテスト] as [テスト] lasts 10 days
[テスト] starts at [設計]'s end
```

### 色の変更

```puml
[プロトタイプを設計] lasts 13 days
[テスト] lasts 4 days
[テスト] starts at [プロトタイプを設計]'s end
[プロトタイプを設計] is colored in Fuchsia/FireBrick
[テスト] is colored in GreenYellow/Green
```

### Completion status

```puml
[foo] lasts 21 days
[foo] is 40% completed
[bar] lasts 30 days and is 10% complete
```

### マイルストーン

```puml
[プロトタイプをテスト] lasts 10 days
[プロトタイプが完成] happens at [プロトタイプをテスト]'s end
[製造ラインの準備] lasts 12 days
[製造ラインの準備] starts at [プロトタイプをテスト]'s end
```

### ハイパーリンク

```puml
[task1] lasts 10 days
[task1] links to [[http://plantuml.com]]
```

### 日付の表示

```puml
Project starts the 20th of september 2017
[プロトタイプを設計] as [タスク1] lasts 13 days
[タスク1] is colored in Lavender/LightBlue
```

### Changing scale

```puml
printscale weekly
Project starts the 20th of september 2020
[Prototype design] as [TASK1] lasts 130 days
[TASK1] is colored in Lavender/LightBlue
[Testing] lasts 20 days
[TASK1]->[Testing]
```

### 休業日

```puml
project starts the 2018/04/09
saturday are closed
sunday are closed
2018/05/01 is closed
2018/04/17 to 2018/04/19 is closed
[プロトタイプを設計] lasts 14 days
[プロトタイプをテスト] lasts 4 days
[プロトタイプをテスト] starts at [プロトタイプを設計]'s end
[プロトタイプを設計] is colored in Fuchsia/FireBrick
[プロトタイプをテスト] is colored in GreenYellow/Green
```

### 簡単なタスク継承

```puml
[プロトタイプを設計] lasts 14 days
then [プロトタイプをテスト] lasts 4 days
then [プロトタイプをデプロイする] lasts 6 days
```

```puml
[プロトタイプを設計] lasts 14 days
[プロトタイプをビルド] lasts 4 days
[テストの準備] lasts 6 days
[プロトタイプを設計] -> [プロトタイプをビルド]
[プロトタイプを設計] -> [テストの準備]
```

### 区切り線

```puml
[タスク1] lasts 10 days
then [タスク2] lasts 4 days
-- 第2段階 --
then [タスク3] lasts 5 days
then [タスク4] lasts 6 day
```

### Working with resources

```puml
[Task1] on {Alice} lasts 10 days
[Task2] on {Bob:50%} lasts 2 days
then [Task3] on {Alice:25%} lasts 1 days
```

### 複雑な例

```puml
[プロトタイプを設計] lasts 13 days and is colored in Lavender/LightBlue
[プロトタイプをテスト] lasts 9 days and is colored in Coral/Green and starts 3 days after [プロトタイプを設計]'s end
[テストを実装] lasts 5 days and ends at [プロトタイプを設計]'s end
[テストプログラマの雇用] lasts 6 days and ends at [テストを実装]'s start
[テストの実施] is colored in Coral/Green
[テストの実施] starts 1 day before [プロトタイプをテスト]'s start and ends at [プロトタイプをテスト]'s end

```
