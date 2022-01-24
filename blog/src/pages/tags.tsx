import React from "react"

import {Helmet} from "react-helmet"
import {graphql, PageProps} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo";
import Tags from "../components/tags";

// const TagsPage = ({
//                       data: {
//                           allMarkdownRemark: { group },
//                           site: {
//                               siteMetadata: { title },
//                           },
//                       },
//                   }) => {
const TagsPage: React.FC<PageProps<GatsbyTypes.TagsQuery>> = ({data}) => {
  const title = data.site?.siteMetadata?.title
  return (
    <Layout>
      <Seo title="All posts"/>
      <div>
        <Helmet title={title}/>
        <Tags/>
      </div>
    </Layout>
  )
}

export default TagsPage
export const pageQuery = graphql`
  query TagsQuery{
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) 
    
    {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
