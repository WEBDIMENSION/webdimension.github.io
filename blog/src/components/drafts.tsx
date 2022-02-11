/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import kebabCase from "lodash/kebabCase"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import IconButton from "@mui/material/IconButton"
import ListIcon from "@mui/icons-material/List"
import SideBarContentBottom from "../components/sideBarContentBottom"
import TagIcon from "@mui/icons-material/Tag"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { createTheme, ThemeProvider } from "@mui/material/styles"

// Components

const Drafts = () => {
  const data = useStaticQuery(graphql`
    query DraftsQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { draft: { in: [true] } } }
        limit: 2000
      ) {
        totalCount
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  `)

  // const draftsLength: number = data.allMarkdownRemark.nodes.length
  const draftsLength: number =
    process.env.NODE_ENV === "production"
      ? 0
      : data.allMarkdownRemark.nodes.length
  console.log(data.allMarkdownRemark)
  console.log(draftsLength)
  // const title: string = data.site.siteMetadata?.title
  // const group: any[] = data.allMarkdownRemark?.group
  // group.sort((a, b) => b.totalCount - a.totalCount);
  //
  //
  // const sideBarTagsCount: number = 24
  // const AllTagsCount = data.allMarkdownRemark?.group.length
  // const tagsCount = isSideBar ? sideBarTagsCount : AllTagsCount

  if (draftsLength > 0) {
    return (
      <DiWrapper>
        <Link to={"/blog/drafts/"}>
          <IconButton>
            <ListIcon />
          </IconButton>
          Draft
        </Link>
      </DiWrapper>
    )
  } else {
    return ""
  }
}

export default Drafts
const DiWrapper = styled.div`
  //list-style: none;
  //display: flex;
  //flex-wrap: wrap;
  //-webkit-justify-content: space-around;
  //justify-content: space-around;
  text-align: center;
  //background-color: #ff5;
  //color: var(--fontColor);
  border: 1px var(--colorWarning) solid;
  border-radius: 8px;
  button {
    color: var(--colorWarning) !important;
  }
`
