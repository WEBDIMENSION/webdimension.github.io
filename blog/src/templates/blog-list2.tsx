import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const BlogList2 = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { numPages } = pageContext

  return (
    <Layout>
      ....
      <ul>
        {Array.from({ length: numPages }, (_, i) => (
          <li key={`pagination-number${i + 1}`}>
            <Link to={`/blog/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export default BlogList2

export const pageQuery = graphql`
  query blogList2Query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    }
  }
`