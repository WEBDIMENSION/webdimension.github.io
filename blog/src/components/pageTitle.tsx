import * as React from "react"
import {useLocation} from "@reach/router"
import {Link} from "gatsby"
import {useStaticQuery, graphql} from "gatsby"
// import {siteMetadata} from "../../gatsby-config"
import styled from "styled-components"
// import {StaticImage} from "gatsby-plugin-image";

const PageTitle = ({ title, prefixTitle}: {title: string, prefixTitle: string}) => {
  return (
    <DivWrapper className="pageTitle">
      {
        (() => {
          if (prefixTitle) {
            return(
            <div className="prefix">{prefixTitle}:</div>
            );
          }
        })()
      }
      <h1>{title}</h1>
    </DivWrapper>

 )
}
export default PageTitle
const DivWrapper = styled.div`
  margin-bottom: 0;
  display: flex;
  .prefix {
    font-size: var(--fontSizeH1);
    margin-right: 0.5em;
  }
`

