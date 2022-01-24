import * as React from "react"
import {useLocation} from "@reach/router"
import {Link} from "gatsby"
import {useStaticQuery, graphql} from "gatsby"
// import {siteMetadata} from "../../gatsby-config"
import styled from "styled-components"
import {StaticImage} from "gatsby-plugin-image";

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
      <div className="container">
        <div className="logo">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "png", "avif"]}
          src="../images/prof.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        {siteName}
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/about">AboutMe</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderWrapper>
  )
}
export default Header
const HeaderWrapper = styled.header`
  
  margin-top: 8px;  
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  //a {
  //  text-decoration: none;
  //}
  //a:visited {
  //  color: var(--black);
  //}
  //a:hover {
  //  color: var(--blue);
  //}
  //
  .container {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      display: flex;
      .bio-avatar{
        margin-right: 16px;
      }
    }
    .headerTitle{
      font-size: 2em;   
      font-weight: bold;
    }
  }


  nav ul {
    margin: 0;
    list-style: none;
    display: flex;

    li {
      padding: 0 0 0 20px;
      font-size: 1.5em;
      //a {
      //  color: var(--black);
      //  font-weight: bold;
      //}
      //a:visited {
      //  color: var(--black);
      //}
      //a:hover {
      //  color: var(--blue);
      //}
    }
  }
`