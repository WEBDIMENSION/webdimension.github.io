import * as React from "react"
import {PageProps, graphql} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contactForm"
import Article from "../components/postArticle"
import styled from "styled-components"
import PageTitle from "../components/pageTitle"


// const NotFoundPage = ({ data, location }) => {
const Contact: React.FC<PageProps<GatsbyTypes.ContactQuery>> = () => {

  // const siteTitle = data?.site?.siteMetadata?.title

  return (
    // <Layout title={siteTitle}>
    <Layout>
      <Seo title="Contact"/>
      <Article>
        <PageTitle title={"Contact"} prefixTitle=""/>
        <section>
          <PWrapper>
            お問い合わせはこちらのフォームからお願いいたします。<br/>
            <br/>
            返信にはお時間頂く場合があります。<br/>
            ご了承くださいませ。<br/>
            <br/>
          </PWrapper>
        </section>
          <section>
            <ContactForm/>
          </section>
      </Article>
    </Layout>
)
}

export default Contact
const PWrapper = styled.p`
padding: 3em;
text-align: center;
`


export const pageQuery = graphql`
query Contact
  {
    site
    {
      siteMetadata
      {
        title
      }
    }
  }
`
