import React from "react"

import {Helmet} from "react-helmet"
import {graphql, PageProps} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo";
import Tags from "../components/tags";
import Article from "../components/postArticle"

// const TagsPage = ({
//                       data: {
//                           allMarkdownRemark: { group },
//                           site: {
//                               siteMetadata: { title },
//                           },
//                       },
//                   }) => {
const TagsPage: React.FC<PageProps<GatsbyTypes.TagsQueryQuery>> = ({data}) => {
  const title = data.site?.siteMetadata?.title

  return (
    <Layout>
      <Article>
        <Seo title="All posts"/>
        <Helmet title={title}/>
        <h1>Tags</h1>
        <section>
          <Tags isSideBar={false}/>
        </section>
      </Article>
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
