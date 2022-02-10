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
import PageTitle from "../components/pageTitle";


// const BlogIndex = ({ data, location }) => {
// const BlogList: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({data}) => {
const BlogList = ({ data, pageContext }) => {
  const subTitle = data.site?.siteMetadata?.subTitle || ``
  const nodes = data.allMarkdownRemark.nodes

  if (nodes.length === 0) {
    return (
      <Layout>
        <Seo
          title={subTitle + "記事一覧"}
          DisplaySubTitle={true}
          description={"記事一覧"}
        />
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
        <Seo
          title={"All posts (記事一覧)"}
          DisplaySubTitle={true}
          description={"All posts (記事一覧)"}
        />
        <Article>
          {/*<H2Wrapper>Blog</H2Wrapper>*/}
          <PageTitle title={"Blog"} prefixTitle=""/>
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

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        subTitle
      }
    }
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
          filter: { frontmatter: {
          draft: { in: [false] }
      } }

    ) {
      nodes {
        excerpt
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
