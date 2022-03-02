import React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Article from "../../components/postArticle"
import PageTitle from "../../components/pageTitle"
import TopicsList from "../../components/topicsList"

const Topics: React.FC<PageProps<GatsbyTypes.TopicsPageQuery>> = () => {
  return (
    <Layout>
      <Seo title="Topic一覧" DisplaySubTitle={false} description={"Topic一覧"} />
      <Article>
        <PageTitle title={"Topics"} prefixTitle="" />
        <section>
          <TopicsList />
        </section>
      </Article>
    </Layout>
  )
}

export default Topics

export const pageQuery = graphql`
  query TopicsPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
