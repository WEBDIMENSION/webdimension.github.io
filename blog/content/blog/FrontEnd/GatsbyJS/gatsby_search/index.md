---

title: "GatsbyJS 検索ページを設置 sessionStorage 使用しページ遷移しても検索結果を保持"
date: "2022-03-07 11:26:56"
post_modified: "2022-03-09 02:00:35"
description: "GatsbyJsでプラグインを使わずサイト内検索を設置。 React-Modal使用。sessionStorage でページ遷移しても検索結果を保持"
categories: ["FrontEnd"]
tags: ["GatsbyJS"]
draft: false

---

## 検索ボックスのためのモーダルを用意

### Install react-modal

```bash
yarn add react-modal @react-modal
```

### modal画面作成

`src/component/modalSearch.js`

```tsx
import React, {useState} from "react"
import Modal from "react-modal"
import Search from "./search"
import styled from "styled-components"
import {Link} from "gatsby"

Modal.setAppElement("#___gatsby")
const ModalSearch: React.FC = () => {
  let subtitle: HTMLHeadingElement | null
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Link to={""} onClick={openModal}>
        Search
      </Link>
      <Modal
        className="modalSearchWindow"
        contentLabel="SearchModal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="modalSearchOverlay"
      >
        <HeaderWrapper>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Search</h2>
          <button onClick={closeModal}>close</button>
        </HeaderWrapper>
        <Search/>
      </Modal>
    </>
  )
}
export default ModalSearch

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;

  h2 {
    color: var(--colorPrimary) !important;
  }
`
```

### 検索結果表示画面コンポーネント

sessionStorage を使用し ページ遷移後も検索結果を保持

`src/component/search.tsx`

```tsx
import React, {useState} from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import styled from "styled-components"

const SearchResult = () => {
  const tempData = useStaticQuery<GatsbyTypes.SearchDataQuery>(graphql`
    query SearchData {
      site {
        siteMetadata {
          title
          subTitle
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { draft: { in: [false] } } }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              post_modified(formatString: "MMMM DD, YYYY")
              title
              description
              tags
            }
          }
        }
      }
    }
  `)

  interface IState {
    filteredData: any
    query: string | null
  }

  const sessQuery = sessionStorage.getItem("sessQuery")
  console.log(sessQuery)

  let postData: any
  let query: string
  const posts = tempData.allMarkdownRemark.edges || []
  if (sessQuery != null) {
    postData = posts.filter((post: any) => {
      const title = post.node.frontmatter.title
      return title.toLowerCase().includes(sessQuery.toLowerCase())
    })
    query = sessQuery
  } else {
    postData = posts
    query = ""
  }

  const [state, setState] = useState<IState>({
    filteredData: postData,
    query,
  })

  const handleInputChange = (event: any) => {
    const query = event.target.value
    const posts = tempData.allMarkdownRemark.edges || []
    const filteredData = posts.filter((post: any) => {
      const title = post.node.frontmatter.title
      return title.toLowerCase().includes(query.toLowerCase())
    })
    setState({
      filteredData,
      query,
    })
    sessionStorage.setItem("sessQuery", query)
  }
  const {filteredData} = state
  const result = filteredData

  return (
    <DivWrapper>
      <div className="result-inner">
        <div className="result-content">
          <input
            type="text"
            value={query}
            aria-label="Search"
            placeholder="検索ワードを入力..."
            onChange={handleInputChange}
          />
          <p className="result-inner__res">
            {query !== "" ? query + " の検索結果: " + result.length + "件" : result.length + "件の記事があります"}
          </p>
          <ul className="result-inner__search">
            {result &&
              result.map((post: any) => {
                return (
                  <li key={post.node.fields.slug}>
                    <Link to={`/blog${post.node.fields.slug}`}>
                      <span className="result-inner__title">{post.node.frontmatter.title}</span>
                      <span className="result-inner__date">({post.node.frontmatter.date}</span>)
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </DivWrapper>
  )
}

export default SearchResult

const DivWrapper = styled.div`
  input {
    margin: 1em 0;
    width: 100%;
    //color: var(--fontColor);
    padding: 8px;
    display: block;
    background-color: var(--hrefBackground);
    color: var(--fontColor);
  }

  .result-inner__res {
    border-bottom: 1px var(--fontColor) solid;
    margin-bottom: 0.5em;
  }

  ul {
    li {
      background-color: var(--bgColorScondary);
      margin-bottom: 0.5em;
      padding-left: 8px;

      .result-inner__date {
        margin-left: 1em;
      }
    }
  }
`
```
