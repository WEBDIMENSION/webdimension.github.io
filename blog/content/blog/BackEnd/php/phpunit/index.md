---
title: "PHPUnit 備忘録"
date: "2023-03-21 05:36:25"
post_modified: "2023-03-21 05:36:25"
description: "PHPUnit でよく使う Assertion"
categories: ["BackEnd"]
tags: ["PHP", "PHPUnit"]
draft: false
---

## setup/teardown

testのmethodが実行されるたびに前処理・後処理

## setUPBeforeClass/tearDownAfterClass

test クラス全体に対しての前処理・後処理

## PHPUnit でよく使う Assertion

[Document](https://phpunit.de/manual/5.5/ja/appendixes.assertions.html)

| MethodA                                                 | Meann                       |
|---------------------------------------------------------|-----------------------------|
| assertEquals($exp, $act)                                | $expと$actが等しい(==)           |
| assertSame($exp, $act)                                  | $expと$actが等しい(===)          |
| assertNotEquals($exp, $act)                             | $expと$actが等しくない             |
| assertContains(mixed $needle, Iterator array $haystack) | 配列に $needleが含まれている          | 
| assertArrayHasKey(mixed $key, array $array)             | 配列にキーが含まれている                |
| assertTrue($cond)                                       | $condがTRUE                  |
| assertFalse($cond)                                      | $condがFALSE                 |
| assertNull($var)                                        | $varがNULL                   |
| assertNotNull($var)                                     | $varがNULLではない               |
| assertInternalType($type, $act)                         | $actの型が$typeと一致する           |
| assertInstanceOf($expected, $actual)                    | $actualが$expectedのインスタンスである |

## PHPUnit でよく使う Annotation

### @test

```phpregexp
class HogeTest extends TestCase
{

/** @test */
public function hogeMethod()
{
...
}

}
```

`/** @test */` を書くことで `testHogeTest` と書かなくて良い

### dataProvider

```phpregexp
class HogeTest extends TestCase
{
    /**
     * @test
     * @dataProvider provider
     */
    public function hoge($dollar, $multiplication, $expect)
    {
        ...
        ...
    }

    /** @test */
    public function provider(): array
    {
        return [
            // $dollar, $multiplication, $expect
            [5, 2, 10],
            [15, 3, 45],
        ];
    }
}
```

`@dataProvider provider` テストデータ指定

### @testWit

```phpregexp
class HogeTest extends TestCase
{
    /**
     * @test
     * @testWith [5, 2, 10]
     *           [15, 3, 45]
     */
    public function hoge($dollar, $multiplication, $expect)
    {
        $dollar = new Dollar($dollar);
        $this->assertEquals(new Dollar($expect), $dollar->times($multiplication));
    }
}
```

`@testWith` で PHPoc 内に データを記述

### @testdox

```phpregexp
/**
     * @test
     * @testdox  説明文 
     * @testWith [5, 2, 10]
     *           [15, 3, 45]
     */
```

`@testdox`に説明文をかける

### @group

```phpregexp
/**
 * @group hogehoge
 */
public function hoge() {
    // ...
}
```

`@group hogehoge` group を指定して 実行できる

```bash
# 指定のグループのみ実行
./vendor/bin/phpunit tests/ --group hogehoge
# 指定のグループ以外実行
./vendor/bin/phpunit tests/ --exclude-group hogehoge
```

### @depends

```phpregexp
class StackTest extends TestCase
{
    public function testEmpty()
    {
        $stack = [];
        $this->assertEmpty($stack);

        return $stack;
    }

    /**
     * @depends testEmpty
     */
    public function testPush(array $stack)
    {
        array_push($stack, 'foo');
        $this->assertSame('foo', $stack[count($stack)-1]);
        $this->assertNotEmpty($stack);

        return $stack;
    }

    /**
     * @depends testPush
     */
    public function testPop(array $stack)
    {
        $this->assertSame('foo', array_pop($stack));
        $this->assertEmpty($stack);
    }
}
```

1. testEmptyの実行
1. testEmptyの実行結果を引数に、testPushを実行
1. testPushの実行結果を引数に、testPopを実行

### @expectedException InvalidArgumentException

```phpregexp
/**
* @expectedException InvalidArgumentException
**/
```

例外を受け取ってもTestOKとする
