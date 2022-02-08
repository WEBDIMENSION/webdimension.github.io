/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import styled from "styled-components"
import InfoIcon from '@mui/icons-material/Info';
import SideBarContentBottom from "../components/sideBarContentBottom"
import IconButton from '@mui/material/IconButton';
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
          github {
            repository
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const github = data.site?.siteMetadata?.github

  return (
    <DivWrapper className="bio">
      WEBエンジニア(第一世代)のおっさんが現在のWEBにしがみつく奮闘記。<br/>
      実経験の備忘録。<br/>
      {isSideBar ?
        <SideBarContentBottom>
          <IconButton
            color="inherit"
            size="large"
            aria-label="about"
          >
            <InfoIcon/>
          </IconButton>
          <Link to={`/about`}>AboutMe</Link>
        </SideBarContentBottom> : ""
      }
    </DivWrapper>
  )
}

export default BioDescription
const DivWrapper = styled.div`
  //display: flex;
  word-wrap: break-word;
  //-webkit-justify-content: space-around;
  //justify-content: space-around;
  //padding: 8px 0;

  //p.sideBarLink {
  //  border-top: 1px var(--fontColor) dotted;
  //  //  width: 100%;
  //  text-align: end;
  //  margin-top: 0.5em;
  //  padding-top: 0.2em;
    //}
`
