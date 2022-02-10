// import * as React from "react"
import React from "react"

import {PageProps, graphql} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Bio from "../components/bio"
import Article from "../components/postArticle"
import PageTitle from "../components/pageTitle"


// const NotFoundPage = ({ data, location }) => {
const About: React.FC<PageProps<GatsbyTypes.AboutQueryQuery>> = () => {

  // const siteTitle = data?.site?.siteMetadata?.title

  return (
    // <Layout title={siteTitle}>
    <Layout>
      <Seo
        title="おっさんWEBエンジニアのプロファイル"
        DisplaySubTitle={false}
        description={"プロファイル"}

      />
      <Article>
        <PageTitle title={"AboutMe"} prefixTitle=""/>
        <section>
          <Bio/>
        </section>
      </Article>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery{
    site {
      siteMetadata {
        title
      }
    }
  }
`
