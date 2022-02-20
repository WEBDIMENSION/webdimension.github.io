import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Tags from "../../components/tags"
import Article from "../../components/postArticle"
import PageTitle from "../../components/pageTitle"

const TagsPage: React.FC<PageProps<GatsbyTypes.TagsQueryQuery>> = () => {
  return (
    <Layout>
      <Article>
        <Seo title={"Tags (タグ)一覧"} DisplaySubTitle={true} description={"Tags (タグ)一覧"} />
        <PageTitle title={"Tags"} prefixTitle="" />
        <section>
          <Tags isSideBar={false} />
        </section>
      </Article>
    </Layout>
  )
}

export default TagsPage
export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
