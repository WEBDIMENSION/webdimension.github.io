import * as React from "react"
import {PageProps, graphql} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contactForm"
import Article from "../components/postArticle"


// const NotFoundPage = ({ data, location }) => {
const Contact: React.FC<PageProps<GatsbyTypes.ContactQuery>> = () => {

  // const siteTitle = data?.site?.siteMetadata?.title

  return (
    // <Layout title={siteTitle}>
    <Layout>
      <Seo title="AboutMe"/>
      <Article>
      <h1>Contact</h1>
        <section>
          説明文
        </section>
        <section>
          <ContactForm/>
        </section>
      </Article>
    </Layout>
  )
}

export default Contact


export const pageQuery = graphql`
  query Contact{
    site {
      siteMetadata {
        title
      }
    }
  }
`
