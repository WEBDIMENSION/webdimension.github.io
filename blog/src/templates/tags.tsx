import React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import ListTitle from "../components/listTitle"
import PageNation from "../components/pageNation"

// import styled from "styled-components"


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
  tag: string
}

const Tags = ({pageContext, data}: { pageContext: IPageContext, data: IData }) => {
  console.log(pageContext)
  const {tag} = pageContext
  const totalCount = data.allMarkdownRemark.totalCount
  const nodes = data.allMarkdownRemark.nodes
  // console.log(nodes)
  // const tagHeader = `${totalCount} post${
  //   totalCount === 1 ? "" : "s"
  // } Tagging: ${tag}`

  return (
    <Layout>
      <Seo
        title={tag}
        // description={post.frontmatter.description || post.excerpt}
        description={tag}
      />
      <div>
        <ListTitle title={tag} prefixTitle="Tagging"/>
        <PostList nodes={nodes}/>
        <Link to="/tags">All tags</Link>
      </div>
      <section>
        <PageNation pageContext={pageContext}/>
      </section>

    </Layout>
  )
}
export default Tags

export const pageQuery = graphql`
query Tags($tag: String, $skip: Int!, $limit: Int!)
  {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
    sort: { fields: [frontmatter___date], order : DESC }
    filter: { frontmatter: { tags: { in: [$tag] } } }
  )
    {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
            date(formatString : "MMMM DD, YYYY" )
          title
          description
        }
      }
    }
  }
`
