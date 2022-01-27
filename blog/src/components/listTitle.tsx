import * as React from "react"
import {useLocation} from "@reach/router"
import {Link} from "gatsby"
import {useStaticQuery, graphql} from "gatsby"
// import {siteMetadata} from "../../gatsby-config"
import styled from "styled-components"
// import {StaticImage} from "gatsby-plugin-image";

const ListTitle = ({ title, prefixTitle}: {title: string, prefixTitle: string}) => {
  return (
    <DivWrapper className="pageTitle">
      <div className="prefix">{prefixTitle}:</div>
      <h1>{title}</h1>
    </DivWrapper>

 )
}
export default ListTitle
const DivWrapper = styled.div`
  margin-bottom: 1em;

  display: flex;
  .prefix {
    font-size: var(--fontSizeH1);
    margin-right: 0.5em;
  }
`

