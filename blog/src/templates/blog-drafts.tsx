import * as React from "react"
// import React from "react"
// import React from 'react';
// import type {FC} from 'react';
// import { Link, graphql } from "gatsby"
import { graphql } from "gatsby"
// import styled from "styled-components"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import Article from "../components/postArticle"
import PageNation from "../components/pageNation"
// import styled from "styled-components"
import PageTitle from "../components/pageTitle"
// import BlogIndex from "../pages"

// const BlogIndex = ({ data, location }) => {
// const BlogList: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({data}) => {
const BlogDrafts = ({ data, pageContext }: { data: any; pageContext: any }) => {
  // const siteTitle = data.site?.siteMetadata?.title || `Title`
  const nodes = data.allMarkdownRemark.nodes

  if (nodes.length === 0) {
    return (
      <Layout>
        <Seo title="All posts" />
        <p> No Draft </p>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Seo title="All posts" />
        <Article>
          <PageTitle title={"Draft"} prefixTitle="" />
          <section>
            <PostList nodes={nodes} />
          </section>
          <section>
            <PageNation pageContext={pageContext} />
          </section>
        </Article>
      </Layout>
    )
  }
}
export default BlogDrafts

export const pageQuery = graphql`
  query blogDraftsQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { in: [true] } } }
    ) {
      nodes {
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
          draft
        }
      }
    }
  }
`
