---
title: "Intellij IDEA でスニペット作成"
date: "2022-02-23 01:30:29"
post_modified: "2022-02-23 01:30:29"
description: "スニペット作成時の知見、奥が深い"
categories: ["Tools"]
tags: ["Intellij IDEA", "Snippet"]
draft: false
---

```text
annotated(<annotation>)

指定された修飾名でアノテーションが付けられたクラス、メソッド、またはフィールドを返します。プロジェクトに指定されたアノテーションを持つプログラム要素が複数ある場合は、選択可能なリストが表示されます。

例: annotated("java.lang.Deprecated") は、@Deprecated でアノテーションされたすべてのプログラム要素を返します。

RESTful Web サービスおよび Web サービスグループ内の一部の事前定義ライブテンプレートは、annotated() 関数を使用します。

arrayVariable()

現在のスコープで最後に宣言された配列を（メソッド変数またはクラスフィールドとして）返します。現在のスコープで宣言されている配列が複数ある場合は、選択可能なリストも表示されます。

例: 次のメソッドがあり、両方の配列宣言の後に arrayVariable() 関数を使用する変数でテンプレートを展開すると、デフォルトで b 配列が返され、クラスフィールドとして定義されている他の配列とともに a を選択するように提案されます。

public String getCode() {

    int a[] = new int[5];
    int b[] = new int[10];

    return code;
}
Copied!
反復グループ内のいくつかの事前定義されたライブテンプレート（itar および ritar）は、arrayVariable() 関数を使用します。

blockCommentEnd()

現在の言語のコンテキストでブロックコメントの終わりを示す文字を返します。

例: Java ファイルでは */ を返します。

blockCommentStart()

現在の言語コンテキストでのブロックコメントの開始を示す文字を返します。

例: Java ファイルでは /* を返します。

camelCase(<String>)

文字列をキャメルケースに変換します。

例: camelCase("my-text-file")、camelCase("my text file")、camelCase("my_text_file") はすべて myTextFile を返します。

capitalize(<String>)

文字列の最初の文字を大文字にします。

例: capitalize("name") は Name を返します。または、capitalize(camelCase("my awesome class")) と組み合わせて MyAwesomeClass を取得することもできます。

capitalizeAndUnderscore(<String>)

文字列のすべての文字を大文字にし、パーツ間にアンダースコアを挿入します。

例: capitalizeAndUnderscore("FooBar")、capitalizeAndUnderscore("foo bar")、capitalizeAndUnderscore("foo-bar") はすべて FOO_BAR を返します。

castToLeftSideType()

必要に応じて、右側の式を左側の式の型にキャストします。

反復グループのいくつかの事前定義テンプレートは、castToLeftSideType() 関数を使用して、未加工のタイプとジェネリクスタイプの両方に単一のテンプレートを設定します。

rightSideType() と比較してください。

className()

現在のクラスの名前を返します（テンプレートを展開した場所）。コンストラクターテンプレートに役立ちます。

clipboard()

システムクリップボードの内容を返します。

commentEnd()

現在の言語コンテキストでコメントの終わりを示す文字を返します。行コメントのある言語の場合、戻り値は空です。

commentStart()

現在の言語コンテキストでコメントの開始を示す文字を返します。行コメントのある言語の場合、戻り値は lineCommentStart() と同じように行コメントの始まりです。

complete()

変数の位置でコード補完を呼び出します。

completeSmart()

変数の位置でスマート型補完を呼び出します。

componentTypeOf(<array>)

配列のコンポーネント型を返します。

例: arrayVariable() の戻り値を componentTypeOf() 関数に渡すことができます。 itar テンプレートは、このロジックを使用して、配列の反復要素を適切に指定します。

concat(<String>, ...)

パラメーターとして関数に渡されたすべての文字列の連結を返します。

例: concat(date()," ",user()) は、スペースで区切られた現在のシステム日付とユーザー名を返します。

currentPackage()

現在のパッケージの名前を返します（テンプレートを展開したクラスを含む）。

date([format])

現在のシステム日付を返します。

デフォルトでは、パラメーターなしで、現在のシステム形式で日付を返します。別の形式を使用するには、SimpleDateFormat(英語) 仕様に従ってパラメーターを指定します。例: date("Y-MM-d, E, H:m") は、2020-02-27, Thu, 16:11 としてフォーマットされた日付を返します。

dbColumns()

テーブルまたはビューの列のリストを返します。 dbColumns() は、コンテキストライブテンプレート（たとえば、ins）で使用されます。オブジェクトを右クリックして SQL スクリプトを選択すると、コンテキストライブテンプレートにアクセスできます。

dbObjectName()

テーブルまたはビューの名前を返します。 dbObjectName() は、コンテキストライブテンプレート（たとえば、top）で使用されます。オブジェクトを右クリックして SQL スクリプトを選択すると、コンテキストライブテンプレートにアクセスできます。

decapitalize(<String>)

文字列の最初の文字を対応する小文字に置き換えます。

例: decapitalize("Name") は name を返します。

descendantClassEnum(<String>)

指定されたクラスの子を返します。

複数の子がある場合は、選択可能なサブクラスのリストが表示されます。例: descendantClassEnum("java.lang.Number") は、java.lang.Float、java.math.BigDecimal などのすべての数値型クラスを返します。

enum(<String>, ...)

テンプレートが展開されたときに補完が提案される文字列のリストを返します。

例: enum("Foo","Bar","Baz") は、指定された文字列の 1 つを選択できるリストを表示します。

escapeString(<String>)

結果を Java 文字列で使用できるように、特殊文字をエスケープします。

例: タブ文字を \t で置き換え、改行文字を \n で置き換え、バックスラッシュを \\ としてエスケープし、引用符を \" としてエスケープします。

expectedType()

テンプレートが展開される式の予想される型を返します（割り当ての右側、return の後、メソッドパラメーターなど）。

fileName()

現在のファイルの名前とその拡張子を返します。

fileNameWithoutExtension()

現在のファイルの名前を拡張子なしで返します。

filePath()

現在のファイルへの絶対パスを返します。

fileRelativePath()

現在のプロジェクトに相対的な現在のファイルパスを返します。特定のファイルの相対パスを確認するには、ファイルを右クリックして参照をコピーを選択するか、⌥⇧ ⌘ C を押します。

firstWord(<String>)

パラメーターとして渡された文字列の最初の単語を返します。

例: firstWord("one two three") は one を返します。

groovyScript(<String>, [arg, ...])

文字列として渡された Groovy スクリプトを実行します。

最初の引数は、スクリプトのテキストまたはスクリプトを含むファイルへのパスを含む文字列です。この関数は、他のオプションの引数を _1、_2、_3、...、_n 変数の値としてスクリプトに渡します。また、_editor 変数を使用して、スクリプト内から現在のエディターにアクセスできます。

次の例は、選択したテキストを単語に分割し、番号付きリストとして表示する groovyScript() 関数を示しています。

groovyScript("def result = ''; _1.split().eachWithIndex { item, index -> result = result + index.next() + '. ' + item + System.lineSeparator() }; return result;", SELECTION);
Copied!
guessElementType(<Collection>)

java.util.Collection に格納されている可能性のある要素のタイプを返します。IntelliJ IDEA は、コレクションから要素を追加または抽出して、そのタイプを定義するコードを探します。

iterableComponentType(<Iterable>)

配列やコレクションなどの反復可能なオブジェクトのタイプを返します。

iterableVariable()

現在のスコープ内で最後に宣言された反復可能なオブジェクト（配列やコレクションなど）を返します。現在のスコープに複数の反復可能なオブジェクトがある場合は、選択可能なリストも表示されます。

事前定義されたライブテンプレート iter は、iterableVariable() 関数を使用します。

lineCommentStart()

現在の言語コンテキストでの行コメントの開始を示す文字を返します。

lineNumber()

現在の行番号を返します。

lowercaseAndDash(<String>)

文字列を小文字に変換し、セパレータとして n ダッシュを挿入します。例: lowercaseAndDash("MyExampleName") と lowercaseAndDash("my example name") はどちらも my-example-name を返します。

methodName()

テンプレートが展開されるメソッドの名前を返します。

methodParameterTypes()

テンプレートが展開されるメソッドのパラメーター型のリストを返します。

methodParameters()

テンプレートが展開されるメソッドのパラメーター名のリストを返します。

methodReturnType()

テンプレートが展開される現在のメソッドによって返される値のタイプを返します。

qualifiedClassName()

テンプレートが展開される現在のクラスの完全修飾名を返します。

regularExpression(<String>, <Pattern>, <Replacement>)

String 内のすべての Pattern を検索し、Replacement に置き換えます。パターンを正規表現として指定して、文字列内で一致するすべてのものを検索できます。

rightSideType()

右側の式の型で左側の変数を宣言します。

反復グループのいくつかの事前定義テンプレートは、rightSideType() 関数を使用して、未加工のタイプとジェネリクスタイプの両方に単一のテンプレートを設定します。

castToLeftSideType() と比較してください。

snakeCase(<String>)

文字列を snake_case に変換します。例: snakeCase("fooBar") と snakeCase("foo bar") はどちらも foo_bar を返します。

spaceSeparated(<String>)

区切り文字としてスペースを含む指定された文字列を返します。例: spaceSeparated("fooBar") は foo Bar を返し、spaceSeparated("Foo_BAR") は Foo BAR を返します。

spacesToUnderscores(<String>)

パラメーターとして渡された文字列内のスペースをアンダースコアに置き換えます。例: spacesToUnderscores("foo bar BAZ") は foo_bar_BAZ を返します。

substringBefore(<String>, <Delimeter>)

指定された区切り文字までの部分文字列を返します。これは、テストファイル名の拡張子を削除できます。例: component-test.js という名前のファイルで使用されている場合、substringBefore(fileName(),".") は component-test を返します。

subtypes(<String>)

現在のスコープで文字列として渡されたタイプのサブタイプを返します。

事前定義された lazy ライブテンプレートは、subtypes(typeOfVariable(VAR)) 関数を使用して、そのサブ型の 1 つで変数の遅延初期化を実行します。

suggestFirstVariableName(<String>)

指定されたコンテキストでパラメーターとして渡された型に割り当てられる可能性のあるすべての変数を返します。

これは variableOfType() に似ていますが、true、false、this、super を提案していません。

suggestIndexName()

最も一般的に使用されるものからの反復でインデックス変数の推奨名を返します: i、j、k など（現在のスコープで使用されていない最初の名前）。

反復グループ（fori、itar、ritar）の事前定義されたテンプレートの一部は、suggestIndexName() 関数を使用して適切なインデックス変数名を提案します。

suggestVariableName()

変数の命名規則を参照するコードスタイル設定に従って、変数の型とその初期化式に基づいて変数の名前を提案します。

例: 反復内の要素を保持する変数の場合、IntelliJ IDEA は、反復されたコンテナーの名前を考慮して、最も妥当な名前を推測します。反復グループ（itar、itco、iten）の事前定義テンプレートの一部は、suggestVariableName() 関数を使用して、反復された要素に適切な変数名を提案します。

time([format])

現在のシステム時刻を返します。

デフォルトでは、パラメーターなしで、現在のシステム形式で時刻を返します。別の形式を使用するには、SimpleDateFormat(英語) 仕様に従ってパラメーターを指定します。例: time("H:m z") は、13:10 UTC としてフォーマットされた時刻を返します。

typeOfVariable(<String>)

パラメーターとして渡された変数の型を返します。

underscoresToCamelCase(<String>)

下線付きの文字列（snake_case など）を camelCase に変換します。例: underscoresToCamelCase(foo_bar_baz) と underscoresToCamelCase(FOO_BaR_baZ) はどちらも fooBarBaz を返します。

underscoresToSpaces(<String>)

文字列のアンダースコアをスペースに変換します。例: underscoresToSpaces(foo_bar_baz) は foo bar baz を返し、underscoresToSpaces(FOO_BaR_baZ) は FOO BaR baZ を返します。

user()

現在のユーザーの名前を返します。

variableOfType(<String>)

パラメーターとして渡された型に割り当てられる可能性のあるすべての変数を返します。例: variableOfType("double")、variableOfType("java.util.Vector")、または variableOfType(methodReturnType())

空の文字列 "" をパラメーターとして渡すと、関数は型に関係なくすべての変数を提案します。

suggestFirstVariableName() とは異なり、この関数は true、false、this、Outer.this などの標準式も返します。
```
