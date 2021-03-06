import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import PageTitle from "../components/pageTitle"
import TagsInContent from "../components/tagsInContent"

const BlogPost = ({ data }: any) => {
  const post = data.markdownRemark
  const { previous, next } = data

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title + " の記事"}
        DisplaySubTitle={true}
        description={post.frontmatter.description || post.excerpt + " の記事"}
      />

      <ArticleWrapper className="blog-post" itemScope itemType="http://schema.org/Article">
        {(() => {
          if (post.frontmatter.draft) {
            return <div className={"draft"}>Draft</div>
          }
        })()}
        <header>
          <PageTitle title={post.frontmatter.title} prefixTitle="" />
        </header>
        <p className="postDate">
          <span>{post.frontmatter.date}</span>
        </p>
        <TagsInContent node={post} />
        <p
          dangerouslySetInnerHTML={{
            __html: post.frontmatter?.description || post?.excerpt || "",
          }}
          itemProp="description"
        />
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <hr />
      </ArticleWrapper>
      <TagsInContent node={post} />
      <NavWrapper className="blogPostNav">
        <ul>
          <li className={"prev"}>
            {previous && (
              <Link to={"/blog" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className={"next"}>
            {next && (
              <Link to={"/blog" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </NavWrapper>
    </Layout>
  )
}

export default BlogPost

const ArticleWrapper = styled.article`
  header {
    margin-bottom: 1em;
    border-bottom: 1px var(--colorPrimary) dashed;
  }

  .draft {
    background-color: var(--colorWarning);
    color: var(--bgColorPrimary);
    padding: 4px;
    border-radius: 4px;
    text-align: center;
    font-weight: bolder;
  }

  P.postDate {
    text-align: end;

    span {
      color: var(--colorSecondary);
    }
  }

  section {
    margin-top: 1em;
    border-radius: 8px;
    background-color: var(--bgColorScondary);
    padding: 0.5em;
  }
`

const NavWrapper = styled.nav`

  margin: 1em 0;

  ul {
    display: flex;
    justify-content: space-between;

    li.next {
      text-align: right;
    }
`

export const pageQuery = graphql`
  query BlogPostBySlug($id: String, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        post_modified(formatString: "MMMM DD, YYYY")
        description
        tags
        draft
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
