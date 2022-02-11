/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql, useStaticQuery } from "gatsby"

const Categories = () => {
  const data = useStaticQuery(graphql`
    query categoriesQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { draft: { in: [false] } } }
        limit: 2000
      ) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const title: string = data.site.siteMetadata?.title
  const group: any[] = data.allMarkdownRemark?.group

  return (
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/blog/categories/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Categories
