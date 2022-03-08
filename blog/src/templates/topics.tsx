import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import PageTitle from "../components/pageTitle"
import PageNation from "../components/pageNation"

const Topics = ({ pageContext, data }: { pageContext: any; data: any }) => {
  const { topic } = pageContext
  const nodes = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo
        title={topic + " がタグ付けされた記事一覧"}
        DisplaySubTitle={true}
        description={topic + " がタグ付けされた記事一覧"}
      />

      <div>
        <PageTitle title={topic} prefixTitle="Topics" />
        <PostList nodes={nodes} />
        <Link to="/blog/topics/">All Topics</Link>
      </div>
      <section>
        <PageNation pageContext={pageContext} />
      </section>
    </Layout>
  )
}
export default Topics

export const pageQuery = graphql`
  query Topics($topic: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___topic_order], order: ASC }
      filter: { frontmatter: { topics: { ne: null, in: [$topic] }, draft: { in: [false] } } }
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
          topics
        }
      }
    }
  }
`
