import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import IconButton from "@mui/material/IconButton"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import kebabCase from "lodash/kebabCase"

const TagsInContent = ({ node }: { node: any }) => {
  return (
    <UlWrapper className={"tags"}>
      {node.frontmatter?.tags?.map((tag: string) => {
        return (
          <li key={tag}>
            <IconButton>
              <LocalOfferIcon />
            </IconButton>
            <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
          </li>
        )
      })}
    </UlWrapper>
  )
}

export default TagsInContent

const UlWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;

  li {
    margin-left: 1em;

    button {
      color: var(--fontColor) !important;
    }
  }
`
