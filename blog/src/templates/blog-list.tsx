import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import Article from "../components/postArticle"
import PageNation from "../components/pageNation"
import PageTitle from "../components/pageTitle"

interface IData {
  allMarkdownRemark: {
    id: number
    excerpt: string
    html: string
    nodes: Array<{
      excerpt: string
      fields: {
        slug: string
      }
    }>
    frontmatter: {
      title: string
      date: string
      post_modified: string
      description: string
      tags: string[]
      draft: boolean
    }
  }
  site: {
    siteMetadata: {
      title: string
      subTitle: string
    }
  }
  previous: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
  next: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
}

const BlogList = ({ data, pageContext }: { data: IData; pageContext: any }) => {
  const subTitle = data.site?.siteMetadata?.subTitle || ``
  const nodes = data.allMarkdownRemark?.nodes

  if (nodes.length === 0) {
    return (
      <Layout>
        <Seo title={subTitle + "記事一覧"} DisplaySubTitle={true} description={"記事一覧"} />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Seo title={"All posts (記事一覧)"} DisplaySubTitle={true} description={"All posts (記事一覧)"} />
        <Article>
          <PageTitle title={"Blog"} prefixTitle="" />
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
      filter: { frontmatter: { draft: { in: [false] } } }
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
        }
      }
    }
  }
`
