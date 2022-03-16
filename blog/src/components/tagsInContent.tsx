import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTag } from "@fortawesome/free-solid-svg-icons"

const TagsInContent = ({ node }: { node: any }) => {
  return (
    <UlWrapper className={"tags"}>
      {node.frontmatter?.tags?.map((tag: string) => {
        return (
          <li key={tag} className={"tags"}>
            <FontAwesomeIcon icon={faTag} size="1x" />
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
