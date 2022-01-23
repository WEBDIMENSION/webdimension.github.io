import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import {Helmet} from "react-helmet"
import {Link, graphql, PageProps} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

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

  const group = data.allMarkdownRemark.group
  const title = data.site?.siteMetadata?.title

  return (
    <Layout>
      <Seo title="All posts"/>
    <div>
      <Helmet title={title}/>
      <div>
        <h1>categories</h1>
        <ul>
          {group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
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