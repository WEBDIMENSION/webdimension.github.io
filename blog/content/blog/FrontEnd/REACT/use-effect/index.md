---
title: "React hooks useEffect"
date: "2022-03-22 02:42:27"
post_modified: "2022-03-22 02:42:27"
description: "React.js useEffectの振る舞い"
categories: ["FrontEnd"]
tags: ["React.js"]
draft: true
---

## React.js userEffect 基本

レンダリング後に事項される

```jsx
useEffect(() => {
  document.title = `${count}回クリックされました`
})
```

最初のレンダリング時のみ実行させたいときは第２引数にからの配列

```jsx
useEffect(() => {
  document.title = `${count}回クリックされました`
  console.log(`再レンダーされました`)
}, [])
```

依存関係を指定する

```jsx
useEffect(() => {
  document.title = `${count}回クリックされました`
  console.log(`再レンダーされました`)
}, [count])
```

クリーンアップ

useEffect()
では、副作用関数がクリーンアップ関数を返すことで、マウント時に実行した処理をアンマウント時に解除します。またその副作用関数は、毎回のレンダリング時に実行され、新しい副作用関数を実行する前に、ひとつ前の副作用処理をクリーンアップします。

```jsx
useEffect(() => {
  elm.addEventListener("click", () => {
  })

  // returned function will be called on component unmount
  return () => {
    elm.removeEventListener("click", () => {
    })
  }
}, [])
```
