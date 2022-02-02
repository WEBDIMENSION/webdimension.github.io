import * as React from "react"
// import React from "react"
// import React from 'react';
// import type {FC} from 'react';
// import { Link, graphql } from "gatsby"
import {PageProps, graphql} from "gatsby"
// import styled from "styled-components"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import Article from "../components/postArticle"
import styled from "styled-components";
import PageNation from "../components/pageNation";



// const BlogIndex = ({ data, location }) => {
const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({data}) => {

  // const siteTitle = data.site?.siteMetadata?.title || `Title`
  const nodes = data.allMarkdownRemark.nodes

  if (nodes.length === 0) {

    return (
      // <Layout>
      <Layout>
        <Seo title="All posts"/>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  } else {

    return (
      <Layout>
          <Seo title="All posts"/>
        <Article>
          <H2Wrapper>TopPage</H2Wrapper>
          <section>
            <PostList nodes={nodes}/>
          </section>
        </Article>
      </Layout>
    )
  }
}
export default BlogIndex

const H2Wrapper = styled.h2`
  font-size: var(--fontSizeH1);
`

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
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
