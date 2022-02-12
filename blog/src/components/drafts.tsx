/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import styled from "styled-components"
import { Link, graphql, useStaticQuery } from "gatsby"
import IconButton from "@mui/material/IconButton"
import ListIcon from "@mui/icons-material/List"

const Drafts = () => {
  const data = useStaticQuery<GatsbyTypes.DraftsQueryQuery>(graphql`
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

  const draftsLength: number =
    process.env.NODE_ENV === "production"
      ? 0
      : data.allMarkdownRemark.nodes.length

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
  text-align: center;
  border: 1px var(--colorWarning) solid;
  border-radius: 8px;
  button {
    color: var(--colorWarning) !important;
  }
`
