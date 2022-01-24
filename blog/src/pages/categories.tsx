import React from "react"
import {Helmet} from "react-helmet"
import {graphql, PageProps} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Categories from "../components/categories";

// const CategoriesPage = ({
//                       data: {
//                           allMarkdownRemark: { group },
//                           site: {
//                               siteMetadata: { title },
//                           },
//                       },
//                   }) => (
const CategoriesPage: React.FC<PageProps<GatsbyTypes.CategoriesQueryQuery>> = ({
  data,
}) => {

  const title = data.site?.siteMetadata?.title

  return (
    <Layout>
      <Seo title="All posts"/>
    <div>
      <Helmet title={title}/>
      <Categories/>
    </div>
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
    allMarkdownRemark(limit: 2000) 
    
    {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`