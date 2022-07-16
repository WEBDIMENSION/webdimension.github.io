---
title: "React hooks useCallback"
date: "2022-03-22 05:07:59"
post_modified: "2022-03-22 05:07:59"
description: "React.js useCallbackの振る舞い"
categories: ["FrontEnd"]
tags: ["React.js"]
draft: false
---

## useCallback() 基本

変数 a, b に変更がない限り再レンダリングする必要はない。

```jsx
const sampleFunc = () => {
  doSomething(a, b)
}
```

callback を使う

```jsx
const sampleFunc = useCallback(
  () => {
    doSomething(a, b)
  }, [a, b]
);
```

すべてが再レンダリングされる例

```jsx
import React, {useState} from 'react'

//Titleコンポーネント(子)
const Title = () => {
  console.log('Title component')
  return (
    <h2>useCallBackTest vol.1</h2>
  )
}

//Buttonコンポーネント(子)
const Button = ({handleClick, value}) => {
  console.log('Button child component', value)
  return <button type="button" onClick={handleClick}>{value}</button>
}

//Countコンポーネント(子)
const Count = ({text, countState}) => {
  console.log('Count child component', text)
  return <p>{text}:{countState}</p>
}

//Counterコンポーネント（親）
const Counter = () => {

  const [firstCountState, setFirstCountState] = useState(0)
  const [secondCountState, setSecondCountState] = useState(10)

//+ 1 ボタンのstateセット用関数
  const incrementFirstCounter = () => setFirstCountState(firstCountState + 1)

//+ 10 ボタンのstateセット用関数
  const incrementSecondCounter = () => setSecondCountState(secondCountState + 10)

//子コンポーネントを呼び出す
  return (
    <>
      <Title/>
      <Count text="+ 1 ボタン" countState={firstCountState}/>
      <Count text="+ 10 ボタン" countState={secondCountState}/>
      <Button handleClick={incrementFirstCounter} value={'+1 ボタン'}/>
      <Button handleClick={incrementSecondCounter} value={'+10 ボタン'}/>
    </>
  )
}

export default Counter
```

React.memo でラッピング, callback でラッピング

```jsx
import React, {useState, useCallback} from 'react'

//Titleコンポーネント(子)
// const Title = () => {
//   console.log('Title component')
//   return (
//     <h2>useCallBackTest vol.1</h2>
//   )
// }
const Title = React.memo(() => {
  console.log('Title component')
  return (
    <h2>useCallBackTest vol.1</h2>
  )
})

//Buttonコンポーネント(子)
// const Button = ({handleClick,value}) => {
//   console.log('Button child component', value)
//   return <button type="button" onClick={handleClick}>{value}</button>
// }

//Buttonコンポーネント(子)
const Button = React.memo(({handleClick, value}) => {
  console.log('Button child component', value)
  return <button type="button" onClick={handleClick}>{value}</button>
})

//Countコンポーネント(子)
// const Count = ({text, countState}) => {
//   console.log('Count child component', text)
//   return <p>{text}:{countState}</p>
// }

//Countコンポーネント(子)
const Count = React.memo(({text, countState}) => {
  console.log('Count child component', text)
  return <p>{text}:{countState}</p>
})
//Counterコンポーネント（親）
const Counter = () => {

  const [firstCountState, setFirstCountState] = useState(0)
  const [secondCountState, setSecondCountState] = useState(10)

//+ 1 ボタンのstateセット用関数
//   const incrementFirstCounter = () => setFirstCountState(firstCountState + 1)
//+ 10 ボタンのstateセット用関数
//   const incrementSecondCounter = () => setSecondCountState(secondCountState + 10)


  //+ 1 ボタンのstateセット用関数
//useCallbackで関数をラップし、依存配列には関数内で利用しているfirstCountStateを入れます。
  const incrementFirstCounter = useCallback(() => setFirstCountState(firstCountState + 1), [firstCountState])

//+ 10 ボタンのstateセット用関数
//useCallbackで関数をラップし、依存配列には関数内で利用しているsecondCountStateを入れます。
  const incrementSecondCounter = useCallback(() => setSecondCountState(secondCountState + 10), [secondCountState])


//子コンポーネントを呼び出す
  return (
    eaas - migration < >
    < Title / >
    < Count
  text = "+ 1 ボタン"
  countState = {firstCountState}
  />
  <Count text="+ 10 ボタン" countState={secondCountState}/>
  <Button handleClick={incrementFirstCounter} value={'+1 ボタン'}/>
  <Button handleClick={incrementSecondCounter} value={'+10 ボタン'}/>
</>
)
}

export default Counter

```
