---
title: "Laravel form facede"
date: "2020-12-15 12:38:34"
post_modified: "2020-12-15 12:38:34"
description: "Form の記述を楽にしてくれるLaravelCollective Formファサード"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

## Laravel form facede

### laravel form facade

[参考](http://recipes.laravel.jp/category/17)
記述が楽。\
_Example_

```html
@extends('layouts.app_user') @section('content')
<div>
  <h3>会員編集</h3>
  {{Form::open( [ 'route' => ['user.update', $currentData->id], 'method' => 'post' ] ) }} {{--
  PUTにできないのなぜかわからない --}} {{-- @method('PUT') --}}
  <div class="form-group">
    <label for="last_name">名前（性）</label>
    {{ Form::text('last_name', $currentData->last_name)}}
  </div>

  <div class="form-group">
    <label for="first_name">名前（名）</label>
    {{ Form::text('first_name', $currentData->first_name)}}
  </div>

  <div class="form-group">
    <label for="last_name_kana">フリガナ（性）</label>
    {{ Form::text('last_name_kana', $currentData->last_name_kana)}}
  </div>

  <div class="form-group">
    <label for="first_name_kana">フリガナ（名）</label>
    {{ Form::text('first_name_kana', $currentData->last_name_kana)}}
  </div>

  <div class="form-group">
    <label for="birthday">誕生日</label>
    {{ Form::date('birthday', $currentData->birthday)}}
  </div>

  <div class="form-group">
    <label for="zip">郵便番号</label>
    {{ Form::text('zip', $currentData->zip)}}
  </div>

  <div class="form-group">
    <label for="pref">都道府県</label>
    {{ Form::select( 'pref', $prefs, $currentData->pref, ['placeholder' => '選択してください'] )}}
  </div>

  <div class="form-group">
    <label for="addr2">住所</label>
    {{ Form::text('addr2'), $currentData->addr2}}
  </div>

  <div class="form-group">
    <label for="addr3">住所</label>
    {{ Form::text('addr3'), $currentData->addr3}}
  </div>

  {{-- <button class="form-group" id="btn">送信</button> --}}
  <div class="form-group">{{ Form::submit('送信') }}</div>
  {{ Form::close() }}
</div>
@endsection
```
