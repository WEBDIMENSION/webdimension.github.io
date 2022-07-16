---
title: "シェルスクリプトをテストする"
date: "2022-04-05 13:59:28"
post_modified: "2022-04-05 13:59:28"
description: "シェルスクリプトにテスト導入、コード品質の向上"
categories: ["Tools"]
tags: ["ShellScript"]
draft: false
---

## Bats でシェルスクリプトをテストする

### Install

#### ubuntu

```bash
sudo apt-get install bats
```

Mac

```bash
brew install bats
```

### exec bats

source test.bats

#### Good pattern

```bash
@test 'add test' {
 var_01=5
 var_02=15
 [[ var_01+var_02 -eq 20 ]]
}
@test 'div test' {
 var_01=5
 var_02=15
 [[ var_02/var_01 -eq 3 ]]
}
```

```bash
bats test.bats
```

結果

```bash
✓ add test
✓ div test

2 tests, 0 failures
```

#### Bad pattern

```bash
@test 'add test' {
 var_01=5
 var_02=15
 [[ var_01+var_02 -eq 20 ]]
}
@test 'div test' {
 var_01=5
 var_02=15
 [[ var_02/var_01 -eq 2 ]]  # Here
}
```

```bash
bats test.bats
```

結果

```bash
 ✓ add test
✗ div test
  (in test file test.bats, line 9)
    `[[ var_02/var_01 -eq 2 ]]' failed

2 tests, 1 failure
```

### 複数ファイルの実行

```bash
├── tests
│   ├── test.bats
│   └── test2.bats

```

```bash
bats tests
```

### 本来の シェルスクリプトを読み込んでテスト

構成

```bash
├── test.sh
└── test.bats
```

test.sh

```bash
#!/usr/bin/env bash

if [[ $1 == test ]]; then
 param='test'
else
 param='not test'
fi

echo "$param"

```

test.bats

```bash
@test 'param test ok' {
  run ./test.sh test
  [[ $status -eq 0 ]]
  [[ $output == 'test' ]]
}

@test 'param test ng' {
  run ./test.sh tst
  [[ $status -eq 0 ]]
  [[ $output == 'not test' ]]
}
```

### テストスクリプトを別ディレクトリで管理したい

構成

```bash
├── test.sh
└── tests
    ├── test.bats
```

bats には bats を実行している絶対パスを BATS_TEST_DIRNAME という環境変数もっている。 でもこの場合は一つ上のディレクトリを指定したい

```bash
PATH="${BATS_TEST_DIRNAME%/*}:$PATH"
```

`%/*`で一つ上のディレクトリを Path に追加

test.sh

```bash
#!/usr/bin/env bash

if [[ $1 == test ]]; then
 param='test'
else
 param='not test'
fi

echo "$param"

```

tests/test.bats

```bash
PATH="${BATS_TEST_DIRNAME%/*}:$PATH"

@test 'param test ok' {
  run test.sh test
  [[ $status -eq 0 ]]
  [[ $output == 'test' ]]
}

@test 'param test ng' {
  run test.sh tst
  [[ $status -eq 0 ]]
  [[ $output == 'not test' ]]
}
```

### run 後の変数

| 変数     | 内容            |
|--------|---------------|
| status | 終了ステータス       |
| output | スクリプトの出力      |
| lines  | outputを分割した配列 |

通常は status と output で判定  

c
