import * as React from "react"
import {PageProps,graphql} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

// const NotFoundPage = ({ data, location }) => {
const NotFoundPage: React.FC<PageProps<GatsbyTypes.NotFoundQueryQuery>> = () => {

  // const siteTitle = data?.site?.siteMetadata?.title

  return (
    // <Layout title={siteTitle}>
    <Layout>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn't exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery{
    site {
      siteMetadata {
        title
      }
    }
  }
`
