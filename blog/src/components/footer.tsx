import * as React from "react"
import {useStaticQuery, graphql} from "gatsby"
import styled from "styled-components";

// import { siteMetadata } from "../../gatsby-config"

const Footer = () => {
  const data = useStaticQuery<GatsbyTypes.FooterQuery>(graphql`
    query Footer {
      site {
        siteMetadata {
          title
          author {
            company
          }
        }
      }
    }
  `)

// const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        <small>
          {data.site?.siteMetadata?.title}
        </small>
        <small>
          &copy;2007&nbsp;{data.site?.siteMetadata?.author?.company}
        </small>
      </p>
    </FooterWrapper>
  )
}
export default Footer

const FooterWrapper = styled.footer`
  text-align: center;
  font-size: var(--fontSizeH3);
  border-top: 1px var(--colorPrimary) solid;
  border-bottom: 1px var(--colorPrimary) solid;
  padding: 0.5em 0;
  margin-bottom: 1em;
  P {
    small {
      display: block;
    }
  }

`
// export const pageQuery = graphql`
//   query Footer {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `