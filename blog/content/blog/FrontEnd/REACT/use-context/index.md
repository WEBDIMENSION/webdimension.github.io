---
title: "React hooks useContext"
date: "2022-03-22 03:24:07"
post_modified: "2022-03-22 03:24:07"
description: "React.js useContextの振る舞い"
categories: ["FrontEnd"]
tags: ["React.js"]
draft: false
---

## React.js useContext 基本

app.js

```jsx
// ReactからcreateContextとuseStateをimport
import React, {createContext, useState} from "react"
import "./App.css"
import Context from "./components/contextSample/context"

//createContextを使ってUserContextとFoodContextを作成
export const UserContext = createContext()
export const FoodsContext = createContext()

export const userData = {
  name: "おじさん",
  age: "50",
}
export const foodsData = ["ちくわぶ", "はんぺん"]

function App() {
  // user データ作成 useStateに格納
  const [user, setUser] = useState(userData)
  // hobby データ作成 useStateに格納
  const [foods, setFoods] = useState(foodsData)

  return (
    <div className="App">
      {/*ここの user が Context 内の useContext(UserContext) で取得できる*/}
      <UserContext.Provider value={user}>
        {/*ここの food が Context 内の useContext(FoodContext) で取得できる*/}
        <FoodsContext.Provider value={foods}>
          <Context/>
        </FoodsContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
```

context.jsx

```jsx
import React, {useContext} from "react"
import {UserContext, FoodsContext} from "../../App"

const ContextC = () => {
  const user = useContext(UserContext)
  const foods = useContext(FoodsContext)
  return (
    <>
      <p>
        {user.name}
        {user.age}歳
      </p>
      <p>きらいな食べ物は</p>
      <ul>
        {foods.map((food, i) => (
          <li key={i}>{food}</li>
        ))}
      </ul>
      です。
    </>
  )
}

export default ContextC
```
