import * as React from "react"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import Box from "@mui/material/Box"
import Drawer from "./drawer"

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
  const location = useLocation()
  const __PATH_PREFIX__ = ""
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let siteName

  if (isRootPath) {
    siteName = <h1 className="headerTitle">{data.site?.siteMetadata?.title}</h1>
  } else {
    siteName = (
      <p className="headerTitle">
        <Link to={rootPath}>{data.site?.siteMetadata?.title}</Link>
      </p>
    )
  }
  return (
    <HeaderWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: {
            xs: "fixed",
            md: "static",
          },
        }}
        className="header"
      >
        <Box sx={{ display: "flex" }} className="logo">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "webp"]}
            src="../images/prof.png"
            width={60}
            height={60}
            quality={95}
            alt="Profile picture"
          />
          {siteName}
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <nav className={"pc"}>
            <ul>
              <li>
                <Link to="/blog/">blog</Link>
              </li>
              <li>
                <Link to="/about/">AboutMe</Link>
              </li>
              <li>
                <Link to="/contact/">Contact</Link>
              </li>
            </ul>
          </nav>
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Drawer />
        </Box>
      </Box>
    </HeaderWrapper>
  )
}
export default Header
const HeaderWrapper = styled.header`


  .header {
    padding-top: 8px;
    padding-bottom: 16px;
    border-bottom: 1px var(--colorPrimary) solid;
    margin-bottom: 1em;
    background-color: var(--bgColorPrimary);
    opacity: 0.96;
    width: 100%;

    .logo {
      .bio-avatar {
        margin-right: 16px;
      }
    }

    .headerTitle {
      font-size: min(4.3vw, 1.6em);
      font-weight: bold;
      padding-top: 0.4em;
    }

    nav.pc {
      display: flex;
      text-align: end;
      margin-top: 1em;

      ul {
        list-style: none;

        li {
          display: inline-block;
          padding-left: 20px;
          font-size: 1.2em;
        }
      }
    }

    a {
      text-decoration: none;
    }

    a:visited {
      color: var(--fontColor);
    }

    a:hover {
      color: var(--fontColor);
    }
`
