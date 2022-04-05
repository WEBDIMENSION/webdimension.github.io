---
title: "React hooks useReducer"
date: "2022-03-22 04:11:30"
post_modified: "2022-03-22 04:11:30"
description: "React.js useReducerの振る舞い"
categories: ["FrontEnd"]
tags: ["React.js"]
draft: true
---

## React.js useReducer 基本

```jsx
const [state, dispatch] = useReducer(reducer, "初期値")
```

```jsx
import React, {useReducer} from "react"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"

// 初期値
const initialState = {
  firstCounter: 0,
  secondCounter: 100,
}
const reducerFunc = (count, action) => {
  switch (action.type) {
    case "increment1":
      return {...count, firstCounter: count.firstCounter + action.value}
    case "decrement1":
      return {...count, firstCounter: count.firstCounter - action.value}
    case "increment2":
      return {...count, secondCounter: count.secondCounter + action.value}
    case "decrement2":
      return {...count, secondCounter: count.secondCounter - action.value}
    case "reset1":
      return {...count, firstCounter: initialState.firstCounter}
    case "reset2":
      return {...count, secondCounter: initialState.secondCounter}
    default:
      return count
  }
}
const Counter2 = () => {
  const [count, dispatch] = useReducer(reducerFunc, initialState)
  return (
    <>
      <h2>カウント：{count.firstCounter}</h2>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={() => dispatch({type: "increment1", value: 1})}>increment1</Button>
        <Button onClick={() => dispatch({type: "decrement1", value: 1})}>decrement1</Button>
        <Button onClick={() => dispatch({type: "reset1"})}>reset</Button>
      </ButtonGroup>
      <h2>カウント2：{count.secondCounter}</h2>
      <ButtonGroup color="secondary" aria-label="outlined primary button group">
        <Button onClick={() => dispatch({type: "increment2", value: 100})}>increment2</Button>
        <Button onClick={() => dispatch({type: "decrement2", value: 100})}>decrement2</Button>
        <Button onClick={() => dispatch({type: "reset2"})}>reset</Button>
      </ButtonGroup>
    </>
  )
}

export default Counter2
```

axios

```jsx
//useReducerとuseReducerをReactからimport
import React, {useReducer, useEffect} from "react"
//axiosをimport
import axios from "axios"

//initialStateを作成
const initialState = {
  isLoading: true,
  isError: "",
  post: {},
}

//reducerを作成、stateとactionを渡して、新しいstateを返すように実装
const dataFetchReducer = (dataState, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        isLoading: true,
        post: {},
        isError: "",
      }
    //データの取得に成功した場合
    //成功なので、isErrorは''
    //postにはactionで渡されるpayloadを代入
    case "FETCH_SUCCESS":
      return {
        isLoading: false,
        isError: "",
        post: action.payload,
      }
    //データの取得に失敗した場合
    //失敗なので、isErrorにエラーメッセージを設定
    case "FETCH_ERROR":
      return {
        isLoading: false,
        post: {},
        isError: "読み込みに失敗しました",
      }
    //defaultではそのまま渡ってきたstateを返しておく
    default:
      return dataState
  }
}
const ReducerFunc = () => {
  //initialStateとreducer関数をuseReducer()に読み、stateとdispatchの準備
  const [dataState, dispatch] = useReducer(dataFetchReducer, initialState)

  useEffect(() => {
    //http getリクエストをurlを書く
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      //リクエストに成功した場合
      .then(res => {
        console.log(res)
        //dispatch関数を呼び、type:には'FETCH_SUCCESS'、payloadには受け取ったデータを代入する
        dispatch({type: "FETCH_SUCCESS", payload: res.data})
      })
      //リクエストに失敗した場合catchの中に入ってくる
      .catch(err => {
        dispatch({type: "FETCH_ERROR"})
      })
  }, [dataState.post.title])
  return (
    <div className="App">
      {/*//Loadingが終わったら記事のタイトルを表示*/}
      <h3>{dataState.isLoading ? "Loading..." : dataState.post.title}</h3>
      {/*//エラーがあった場合の処理*/}
      <p>{dataState.isError ? dataState.isError : null}</p>
    </div>
  )
}

export default ReducerFunc
```
