import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

// import { siteMetadata } from "../../gatsby-config"

const Footer = () => {
    const data = useStaticQuery<GatsbyTypes.FooterQuery>(graphql`
    query Footer {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

// const Footer = () => {
    return (
        <footer>
            <p>
                <small>(c) 2021 {data.site?.siteMetadata?.title}s</small>
            </p>
        </footer>
    )
}
export default Footer

// export const pageQuery = graphql`
//   query Footer {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `