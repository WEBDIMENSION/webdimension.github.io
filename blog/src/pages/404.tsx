import * as React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Article from "../components/postArticle"
import Tags from "../components/tags"
import PageTitle from "../components/pageTitle"

const NotFoundPage: React.FC<PageProps<GatsbyTypes.NotFoundQueryQuery>> = () => {
  return (
    <Layout>
      <Seo title="404: Not Found - お問い合わせのページは見つかりませんでした。" />
      <Article>
        <PageTitle title={"404: Not Found"} prefixTitle="" />
        <section>
          <p>お探しのページはみつかりませんでした。</p>
        </section>
        <h2>Tags</h2>
        <section>
          <Tags isSideBar={false} />
        </section>
      </Article>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
