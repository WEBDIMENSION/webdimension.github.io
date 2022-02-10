import React from "react"
import {graphql, PageProps} from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Categories from "../../components/categories";
import Article from "../../components/postArticle"

const CategoriesPage: React.FC<PageProps<GatsbyTypes.CategoriesQueryQuery>> = ({ data, }) => {
  const title = data.site?.siteMetadata?.title

  return (
    <Layout>
      <Article>
        <Seo
          title={"Categories (カテゴリー)一覧"}
          DisplaySubTitle={true}
          description={"Categories (カテゴリー)一覧"}
        />

        <h1>Categories</h1>
        <section>
          <Categories/>
        </section>
      </Article>
    </Layout>
  )
}


export default CategoriesPage

export const pageQuery = graphql`
  query CategoriesQuery{
    site {
      siteMetadata {
        title
      }
    }
  }
`