import React from "react"
import { Link, graphql } from "gatsby"
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
  tag: string
}

const Tags = ({ pageContext, data }: { pageContext: IPageContext; data: IData }) => {
  const { tag } = pageContext
  const nodes = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo
        title={tag + " がタグ付けされた記事一覧"}
        DisplaySubTitle={true}
        description={tag + " がタグ付けされた記事一覧"}
      />

      <div>
        <PageTitle title={tag} prefixTitle="Tagging" />
        <PostList nodes={nodes} />
        <Link to="/blog/tags/">All tags</Link>
      </div>
      <section>
        <PageNation pageContext={pageContext} />
      </section>
    </Layout>
  )
}
export default Tags

export const pageQuery = graphql`
  query Tags($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { in: [false] } } }
    ) {
      totalCount
      nodes {
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
`
