import React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import ListTitle from "../components/listTitle"

interface IData {
  allMarkdownRemark: {
    totalCount: number
    nodes: Array<{
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        date: string
        description: string
      }
    }>
  }
}


interface IPageContext {
  category: string
}

const Categories = ({pageContext, data}: { pageContext: IPageContext, data: IData }) => {
  const {category} = pageContext
  const totalCount = data.allMarkdownRemark.totalCount
  const nodes = data.allMarkdownRemark.nodes
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
        <ListTitle title={category} prefixTitle="Catagory"/>
        <PostList nodes={nodes}/>
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
      nodes {
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