import * as React from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
// import {siteMetadata} from "../../gatsby-config"

// import styled from "styled-components"

const Header = () => {
    const data = useStaticQuery<GatsbyTypes.HeaderQuery>(graphql`
    query Header {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    const location = useLocation();
    const __PATH_PREFIX__ = ''
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath
    let siteName

    if (isRootPath) {
        siteName = <h1 className="logo">{data.site?.siteMetadata?.title}</h1>
    } else {
        siteName = (
            <p className="logo">
                <Link to={rootPath}>{data.site?.siteMetadata?.title}</Link>
            </p>
        )
    }
    return (
        <header>
            <div className="container">
                {siteName}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">top</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header