import React from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Categories from "../../components/categories"
import Article from "../../components/postArticle"
import PageTitle from "../../components/pageTitle"

const CategoriesPage: React.FC<PageProps<GatsbyTypes.CategoriesQueryQuery>> = () => {
  return (
    <Layout>
      <Article>
        <Seo title={"Categories (カテゴリー)一覧"} DisplaySubTitle={true} description={"Categories (カテゴリー)一覧"} />
        <PageTitle title={"Categories"} prefixTitle="" />
        <section>
          <Categories />
        </section>
      </Article>
    </Layout>
  )
}

export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
