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

const TopicsList = () => {
  const data = useStaticQuery<GatsbyTypes.TopicsListQuery>(graphql`
    query TopicsList {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(filter: { frontmatter: { draft: { in: [false] } } }, limit: 2000) {
        group(field: frontmatter___topics) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  // const title: string = data.site.siteMetadata?.title
  const group: any = data.allMarkdownRemark?.group
  group?.sort((a: any, b: any) => b.totalCount - a.totalCount)

  const topicsCount = data.allMarkdownRemark?.group.length

  return (
    <div>
      <UlWrapper>
        {group.slice(0, topicsCount).map((topic: any) => (
          <LiWrapper key={topic.fieldValue}>
            <div>
              <Link to={`/blog/topics/${kebabCase(topic.fieldValue)}/`}>{topic.fieldValue}</Link>
              &nbsp;(全{topic.totalCount}ページ)
            </div>
          </LiWrapper>
        ))}
      </UlWrapper>
    </div>
  )
}

export default TopicsList
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
