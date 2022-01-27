/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import kebabCase from "lodash/kebabCase"
import styled from "styled-components"
import {Link, graphql, useStaticQuery} from "gatsby"

// Components
// import {Helmet} from "react-helmet"

const Tags = ({isSideBar}: { isSideBar: boolean }) => {

  const data = useStaticQuery(graphql`
    query  tagsQuery{
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  // const title: string = data.site.siteMetadata?.title
  const group: any[] = data.allMarkdownRemark?.group
  group.sort((a, b) => b.totalCount - a.totalCount);


  const sideBarTagsCount: number = 24
  const AllTagsCount = data.allMarkdownRemark?.group.length
  const tagsCount = isSideBar ? sideBarTagsCount : AllTagsCount

  return (
   <>
          <UlWrapper>
            {group.slice(0, tagsCount).map(tag => (
              <LiWrapper key={tag.fieldValue}>
                <div>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue}
                  </Link>&nbsp;({tag.totalCount})
                </div>
              </LiWrapper>
            ))}
            {isSideBar ? <p className="sideBarLink"><Link to={`/tags`}>&gt;&gt;&nbsp;More Tags&nbsp;({AllTagsCount})</Link></p> : ''}
          </UlWrapper>
    </>
  )
}

export default Tags
// const SideBarContent = styled.p`
//   //background-color: #333333;
//   //border-radius: 1em;
//   //padding: 0.5em;
// `
const UlWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  //border: 1px var(--borderColor) solid;
  p {
    border-top: 1px var(--fontColor) dotted;
    width: 100%;
    text-align: end;
    margin: 0.5em 0.5em;
    padding-top: 4px;
  }
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
    background-color: var(--hover);
  }

`