import * as React from "react"
// import React from "react"
// import React from 'react';
// import type {FC} from 'react';
// import { Link, graphql } from "gatsby"
import {PageProps, graphql, Link } from "gatsby"
// import styled from "styled-components"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import Article from "../components/postArticle"
import PageNation from "../components/pageNation"
import styled from "styled-components";
import BlogIndex from "../pages";


// const BlogIndex = ({ data, location }) => {
// const BlogList: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({data}) => {
const BlogList = ({ data, pageContext }) => {
  // const siteTitle = data.site?.siteMetadata?.title || `Title`
  const nodes = data.allMarkdownRemark.nodes

  if (nodes.length === 0) {
    return (
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
          <H2Wrapper>Blog</H2Wrapper>
          <section>
            <PostList nodes={nodes}/>
          </section>
          <section>
            <PageNation pageContext={pageContext}/>
          </section>
        </Article>
      </Layout>
    )
  }
}
export default BlogList

const H2Wrapper = styled.h2`
  font-size: var(--fontSizeH1);
  
`
export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: $limit
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
