import * as React from "react"
import { PageProps, graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Article from "../../components/postArticle"
import styled from "styled-components"
import PageTitle from "../../components/pageTitle"

const Contact: React.FC<PageProps<GatsbyTypes.ContactQuery>> = () => {

  return (
    <Layout>
      <Seo
        title="Thanks - お問い合わせお問い合わせ完了"
        DisplaySubTitle={false}
        description={"Contact- お問い合わせ完了"}
      />

      <Article>
        <PageTitle
          title={"お問い合わせありがとうございました"}
          prefixTitle=""
        />
        <section>
          <PWrapper>
            返信にはお時間頂く場合があります。
            <br />
            ご了承くださいませ。
            <br />
            <br />
          </PWrapper>
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
  query ContactThanks {
    site {
      siteMetadata {
        title
      }
    }
  }
`
