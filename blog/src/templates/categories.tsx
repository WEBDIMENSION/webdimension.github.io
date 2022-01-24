import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


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
  category: string
}

const Categories = ({pageContext, data }: {pageContext: IPageContext, data: IData}) => {
    const { category } = pageContext
    const { totalCount, edges } = data.allMarkdownRemark
    const categoryHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
    } category with "${category}"`


    return (
      <Layout>
        <Seo
          title={category}
          // description={post.frontmatter.description || post.excerpt}
          description={category}
        />
        <div>
            <h1>{categoryHeader}</h1>
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
            <Link to="/category">All categories</Link>
        </div>
      </Layout>
    )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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