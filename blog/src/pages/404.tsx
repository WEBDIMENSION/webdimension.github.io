import * as React from "react"
import {PageProps, graphql} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Article from "../components/postArticle"
import Tags from "../components/tags"

// const NotFoundPage = ({ data, location }) => {
const NotFoundPage: React.FC<PageProps<GatsbyTypes.NotFoundQueryQuery>> = () => {

  // const siteTitle = data?.site?.siteMetadata?.title

  return (
    // <Layout title={siteTitle}>
    <Layout>
      <Seo title="404: Not Found"/>
      <Article>
          <h1>404: Not Found</h1>
          <section>
            <p>お探しのページはみつかりませんでした。</p>
          </section>
          <h2>Tags</h2>
          <section>
            <Tags isSideBar={false}/>
          </section>
      </Article>
    </Layout>
)
}

export default NotFoundPage

export const pageQuery = graphql`
query NotFoundQuery
  {
    site
    {
      siteMetadata
      {
        title
      }
    }
  }
`
