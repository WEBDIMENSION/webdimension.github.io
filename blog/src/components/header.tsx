import * as React from "react"
import {useLocation} from "@reach/router"
import {Link} from "gatsby"
import {useStaticQuery, graphql} from "gatsby"
// import {siteMetadata} from "../../gatsby-config"
import styled from "styled-components"
import {StaticImage} from "gatsby-plugin-image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Drawer from "./drawer";


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
      <Box sx={{display: 'flex', justifyContent: 'space-between'}} className="header">
        {/*  <Grid container>*/}
        {/*    <Grid item xs={12} md={9} className={"header mb6"}>*/}
        <Box sx={{display: 'flex'}} className="logo">
          <StaticImage
            className="bio-avatar"
            layout="fixed"
            formats={["auto", "png", "avif"]}
            src="../images/prof.png"
            width={60}
            height={60}
            quality={95}
            alt="Profile picture"
          />
          {siteName}
        </Box>
        {/*</Grid>*/}
        {/*<Grid item xs={12} md={3}>*/}
        <Box sx={{
          display: {
            xs: 'none',
            md: 'block',
          }
        }}>
          <nav className={"pc"}>
            <ul>
              <li>
                <Link to="/blog">blog</Link>
              </li>
              <li>
                <Link to="/about">AboutMe</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </Box>
        <Box sx={{
          display: {
            xs: 'block',
            md: 'none',
          }
        }}>
          <Drawer/>
        </Box>

        {/*  </Grid>*/}
        {/*</Grid>*/}
      </Box>

    </HeaderWrapper>
  )
}
export default Header
const HeaderWrapper = styled.header`


  .header {
    //height: 2.0em;
    ////display: flex;
    //align-items: center;
    ////justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px var(--colorPrimary) solid;
    margin-bottom: 1em;

    .logo {
      //display: flex;
      .bio-avatar {
        margin-right: 16px;
      }
    }

    .headerTitle {
      font-size: 1.6em;
      font-weight: bold;
      padding-top: 0.4em;
    }

    //}
    //
    //
    nav.pc {
      display: flex;
      //width: 100%;
      text-align: end;
      margin-top: 1em ;
      //background-color: #FFf;

      ul {
        //justify-content: space-around;
        //width: 100%;
        list-style: none;
        //background-color: #FFee00;

        //vertical-align: bottom;
        //height: 100%;
        //display: flex;

        li {
          //text-align: end;
          display: inline-block;
          padding-left: 20px;
          font-size: 1.2em;
          //padding-top: 0.5em;
          //vertical-align: bottom;
          //justify-content: flex-end;
          //background-color: #00ffff;
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