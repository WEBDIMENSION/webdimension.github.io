import * as React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList"
import Article from "../components/postArticle"
import styled from "styled-components"
import BioDescription from "../components/bioDescription"
import GoogleAdsense from "../components/google/googleAdsense"
import Topics from "../components/topics"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBlog, faBellConcierge } from "@fortawesome/free-solid-svg-icons"

const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({ data }) => {
  const nodes = data.allMarkdownRemark.nodes

  if (nodes.length === 0) {
    return (
      <Layout>
        <Seo title="No blog posts found" />
        <p>no post</p>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Seo title="TopPage" DisplaySubTitle={false} description={"TopPage (トップページ)、Latest post (最近の投稿)"} />
        <DivWrapper className={"topText"}>
          <BioDescription isSideBar={false} />
          <p>
            WEB系バックエンドを主軸にインフラからフロントエンドまでが守備範囲。
            <br />
            WEBエンジニアを目指す方への参考になれば幸いです。
          </p>
          <GoogleAdsense slotKey={"contentsLower"} />
        </DivWrapper>
        <Article>
          <H2Wrapper>
            <FontAwesomeIcon icon={faBellConcierge} />
            Topics
          </H2Wrapper>
          <section>
            <Topics isSideBar={false} />
          </section>
        </Article>
        <Article>
          <H2Wrapper>
            <FontAwesomeIcon icon={faBlog} />
            最近の投稿
          </H2Wrapper>
          <section>
            <PostList nodes={nodes} />
          </section>
        </Article>
      </Layout>
    )
  }
}
export default BlogIndex

const DivWrapper = styled.div`
  margin: 2.2em 0;
  font-size: 1.2em;
  line-height: 2em;
  text-align: center;

  p {
    margin: 2em 0;
    line-height: 3em;
    background-color: var(--bgColorScondary);
  }
`

const H2Wrapper = styled.h2`
  font-size: var(--fontSizeH1);
  text-align: center;
  margin-bottom: 0.5em;
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
