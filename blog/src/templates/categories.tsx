import React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import PageTitle from "../components/pageTitle"
import PageNation from "../components/pageNation"

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
        post_modified: string
        description: string
        tags: string[]
        draft: boolean
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
  console.log(nodes)

  return (
    <Layout>
      <Seo
        title={category}
        // description={post.frontmatter.description || post.excerpt}
        description={category}
      />
      <div>
        <PageTitle title={category} prefixTitle="Category"/>
        <PostList nodes={nodes}/>
        <Link to="/category/">All categories</Link>
      </div>
      <section>
        <PageNation pageContext={pageContext}/>
      </section>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query Categories($category: String, $skip: Int!, $limit: Int!)
  {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { 
          categories: { in: [$category] }
          draft: { in: [false] }
           } }
    )
     {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          post_modified(formatString : "MMMM DD, YYYY" )
          title
          description
          tags
        }
      }
    }
  }
`