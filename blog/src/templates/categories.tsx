import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import PageTitle from "../components/pageTitle"
import PageNation from "../components/pageNation"

const Categories = ({ pageContext, data }: { pageContext: any; data: any }) => {
  const { category } = pageContext
  const nodes = data.allMarkdownRemark.nodes
  console.log(nodes)

  return (
    <Layout>
      <Seo title={category} />
      <Seo
        title={category + " がカテゴライズされた記事一覧"}
        DisplaySubTitle={true}
        description={category + " がカテゴライズされた記事一覧"}
      />

      <div>
        <PageTitle title={category} prefixTitle="Category" />
        <PostList nodes={nodes} />
        <Link to="/category/">All categories</Link>
      </div>
      <section>
        <PageNation pageContext={pageContext} />
      </section>
    </Layout>
  )
}

export default Categories

export const pageQuery = graphql`
  query Categories($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] }, draft: { in: [false] } } }
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
