---

title: "GatsbyJs の Fabcon.ico を変更"
date: "2022-03-02 20:43:40"
post_modified: "2022-03-02 20:43:40"
description: "GatsbyJS のFabicon.icon を変更。gatsby-config.js にて設定"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "10"
draft: false

---

`gatsby-config.js`

```js
{
  resolve: `gatsby-plugin-manifest`,
    options
:
  {
    name: `Gatsby Starter Blog`,
      short_name
  :
    `GatsbyJS`,
      start_url
  :
    `/`,
      background_color
  :
    `#ffffff`,
      display
  :
    `minimal-ui`,
      icon
  :
    `src/images/icon.png`,
  }
,
}
```

`icon: `src/images/icon.png`,` を変更する。  
自動生成される。
