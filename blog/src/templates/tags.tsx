import React from "react"
import { Link, graphql } from "gatsby"

interface IData {
  allMarkdownRemark: {
    totalCount: number
    edges: Array<{
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
        }
      }
    }>
  }
}

interface IPageContext {
  tag: string
}

  const Tags = ({pageContext, data }: {pageContext: IPageContext, data: IData}) => {
  const { tag } = pageContext
  const { totalCount, edges } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  return (
    <div>
       <h1>{tagHeader}</h1>
      {/* <h1>{tag}</h1> */}
      <ul>
        {edges.map(({ node }: { node: any }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query Tags($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
