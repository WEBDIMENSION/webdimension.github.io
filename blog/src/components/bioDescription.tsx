/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import styled from "styled-components"
// import {StaticImage} from "gatsby-plugin-image"

const BioDescription = ({isSideBar}: { isSideBar: boolean }) => {
  const data = useStaticQuery<GatsbyTypes.BioDescriptionQuery>(graphql`
    query BioDescription {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site?.siteMetadata?.author
  const social = data.site?.siteMetadata?.social

  return (
    <DivWrapper className="bio">
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          {/*<a href={`https://twitter.com/${social?.twitter || ``}`}>*/}
          {/*  You should follow them on Twitter*/}
          {/*</a>*/}
        </p>
      )}
      {isSideBar ? <p className="sideBarLink"><Link to={`/AboutMe`}>AboutMe</Link></p> : ''}
    </DivWrapper>
  )
}

export default BioDescription
const DivWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-around;
  justify-content: space-around;

  p.sideBarLink {
    border-top: 1px var(--fontColor) dotted;
    width: 100%;
    text-align: end;
    margin: 0.5em 0.5em;
    padding-top: 4px;
  }
`
