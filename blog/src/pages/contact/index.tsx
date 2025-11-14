import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import ContactForm from "../../components/contactForm"
import Article from "../../components/postArticle"
import styled from "styled-components"
import PageTitle from "../../components/pageTitle"

const Contact: React.FC<PageProps<GatsbyTypes.ContactQuery>> = () => {
  return (
    <Layout>
      <Seo
        title="おっさんWEBエンジニア Contact- お問い合わせ"
        DisplaySubTitle={false}
        description={"Contact- お問い合わせ"}
      />

      <Article>
        <PageTitle title={"Contact"} prefixTitle="" />
        <section>
          <PWrapper>
            お問い合わせは以下フォームからお願いいたします。
            <br />
            <Link to={"https://www.webdimension.jp/#contact"} rel="prev" target="_blank">
              コーポレートサイト問い合わせフォーム
            </Link>
            <br />
            (新規タブで開きます)
            <br />
            <br />
            返信にはお時間頂く場合があります。
            <br />
            ご了承くださいませ。
            <br />
            <br />
          </PWrapper>
        </section>
        {/* <section> */}
        {/* <ContactForm /> */}
        {/* </section> */}
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
  query Contact {
    site {
      siteMetadata {
        title
      }
    }
  }
`
