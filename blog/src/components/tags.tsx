/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import kebabCase from "lodash/kebabCase"

// Components
import {Helmet} from "react-helmet"
import {Link, graphql, useStaticQuery} from "gatsby"
import styled from "styled-components"

const Tags = () => {
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

  const title: string = data.site.siteMetadata?.title
  const group: any[] = data.allMarkdownRemark?.group

  return (
    <div className="tags">
      <Helmet title={title}/>
      <div>
        <h2>Tags</h2>
        <UlWrapper>
          {group.map(tag => (
            <LiWrapper key={tag.fieldValue} >
              <div>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue}
                </Link>&nbsp;({tag.totalCount})
              </div>
            </LiWrapper>
          ))}
        </UlWrapper>
      </div>
    </div>
  )
}

export default Tags
const UlWrapper = styled.ul`
  list-style: none;
  padding-left: 0.5em;
  display: flex;
  flex-wrap: wrap;
`
const LiWrapper = styled.li`
  color: var(--black);
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