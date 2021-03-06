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
import SideBarContentBottom from "../components/sideBarContentBottom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTags } from "@fortawesome/free-solid-svg-icons"

const Tags = ({ isSideBar }: { isSideBar: boolean }) => {
  const data = useStaticQuery<GatsbyTypes.tagsQueryQuery>(graphql`
    query tagsQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(filter: { frontmatter: { draft: { in: [false] } } }, limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  // const title: string = data.site.siteMetadata?.title
  const group: any = data.allMarkdownRemark?.group
  group?.sort((a: any, b: any) => b.totalCount - a.totalCount)

  const sideBarTagsCount = 24
  const AllTagsCount = data.allMarkdownRemark?.group.length
  const tagsCount = isSideBar ? sideBarTagsCount : AllTagsCount

  return (
    <div>
      <UlWrapper>
        {group.slice(0, tagsCount).map((tag: any) => (
          <LiWrapper key={tag.fieldValue}>
            <div>
              <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>{tag.fieldValue}</Link>
              &nbsp;({tag.totalCount})
            </div>
          </LiWrapper>
        ))}
      </UlWrapper>
      {isSideBar ? (
        <SideBarContentBottom>
          <FontAwesomeIcon icon={faTags} size="1x" />
          <Link to={`/blog/tags/`}>All Tags</Link>
        </SideBarContentBottom>
      ) : (
        ""
      )}
    </div>
  )
}

export default Tags
const UlWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  border: 1px var(--borderColor) solid;
`
const LiWrapper = styled.li`
  div {
    margin-right: 1em;
  }

  a {
    //color: var(--black);
    font-weight: bold;
    display: inline-block;
    border-radius: 10px;
    padding: 0.1em 0.5em;
    margin-bottom: 0.5em;
    background-color: var(--hrefBackground);
  }

  a:visited {
    //color: var(--visited);
    background-color: var(--hrefVisitedBackground);
  }

  a:hover {
    //color: var(--white);
    color: var(--colorPrimary);
    background-color: var(--visitedColor);
  }
`
