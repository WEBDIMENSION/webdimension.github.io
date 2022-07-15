---
title: "React hooks userState"  
date: "2022-03-22 01:49:26"  
post_modified: "2022-03-22 01:49:26"  
description: "React.js useStateの振る舞い"
categories: ["FrontEnd"]
tags: ["React.js"]
draft: false
---

[参考サイト](https://qiita.com/seira/items/f063e262b1d57d7e78b4)

## React useState() 基本

```jsx
// const [変数, セッター] = useState(初期値)
const [open, setOpen] = useState(true)
const toggle = () => setOpen(!open)
return (
  <>
    <button onClick={toggle}>{open ? 'close' : 'open'}</button>
    <div className={open ? 'isOpen' : 'isClose'}>
      Something
    </div>
  </>
)
```

## React useState() 最初のレンダリング時のみ初期化

```jsx
// 初期値に関数を指定
const [initialState] = useState(() => {
  return Math.floor(Math.random() * 10) + 1
})
```

