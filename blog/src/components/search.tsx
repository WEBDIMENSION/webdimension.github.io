import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
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
  const { filteredData } = state
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
