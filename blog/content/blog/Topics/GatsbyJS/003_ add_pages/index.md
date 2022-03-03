---

title: "GatsbyJS ページを追加する"
date: "2022-03-02 20:25:50"
post_modified: "2022-03-02 20:25:50"
description: "GatsbyJSに AboutMe ページを追加する。"
categories: ["FrontEnd"]
tags: ["GatsbyJS", "TypeScript"]
topics: "GatsbyJS"
topic_order: "3"
draft: false

---

## AboutMe page 追加

### about.tsx 追加

```bash
cp src/pages/index.tsx src/pages/about.tsx
```

### about.tsx

```tsx
import * as React from "react"
import {graphql, PageProps} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const About: React.FC<PageProps<GatsbyTypes.AboutQuery>> = ({data, location}) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="about"/>
      <Bio/>
      <article className="post-list-item" itemScope itemType="http://schema.org/Article">
        <header>
          <h1>About Me</h1>
        </header>
        <section>
          <p>コンテンツ</p>
        </section>
      </article>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
```

#### 詳細

##### query に名前

```tsx
export const pageQuery = graphql`
  query About {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
```

##### graphql の型を反映

```tsx
const About: React.FC<PageProps<GatsbyTypes.AboutQuery>> = ({data, location}) => {
...
...
...
}
export default About
```

##### About ページのコンテンツ

```tsx
return (
  <Layout location={location} title={siteTitle}>
    <Seo title="about"/>
    <Bio/>
    <article className="post-list-item" itemScope itemType="http://schema.org/Article">
      <header>
        <h1>About Me</h1>
      </header>
      <section>
        <p>コンテンツ</p>
      </section>
    </article>
  </Layout>
)
```

![スクリーンショット](images/abutme.png)

## メニューバーを追加して AbutMe のリンクをはる

src/components/layout.tsx

```tsx
return (
  <div className="global-wrapper" data-is-root-path={isRootPath}>
    <header className="global-header">{header}</header>
    <!-- Start -->
    <nav>
      <Link to="/about/">AboutMe</Link>
    </nav>
    <!-- end -->
    <main>{children}</main>
    <footer>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.com">Gatsby</a>
    </footer>
  </div>
)
```

![スクリーンショット](images/about_nav.png)
