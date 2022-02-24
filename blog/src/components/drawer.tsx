import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import IconButton from "@mui/material/IconButton"
import { Menu } from "@mui/icons-material"
import HomeIcon from "@mui/icons-material/Home"
import TagIcon from "@mui/icons-material/Tag"
import InfoIcon from "@mui/icons-material/Info"
import EmailIcon from "@mui/icons-material/Email"
import ListIcon from "@mui/icons-material/List"
import Mode from "./mode"

const drawer = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <DivWrapper>
      <IconButton className={"menuButton"} color="inherit" onClick={toggleDrawer} size="large" aria-label="menu">
        <Menu />
      </IconButton>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <div className={"closeButton"}>
          <button onClick={toggleDrawer}>Close</button>
        </div>
        <UlWrapper className={"drawerMenu"}>
          <li>
            <IconButton color="inherit" size="large" aria-label="home">
              <HomeIcon />
            </IconButton>

            <Link to={`/`}>Top</Link>
          </li>
          <li>
            <IconButton color="inherit" size="large" aria-label="blog">
              <ListIcon />
            </IconButton>
            <Link to={`/blog/`}>Blog</Link>
          </li>
          <ul className={"secondaryMenu"}>
            <li>
              <IconButton color="inherit" size="large" aria-label="tags">
                <TagIcon />
              </IconButton>
              <Link to={`/blog/tags/`}>Tags</Link>
            </li>
          </ul>
          <li>
            <IconButton color="inherit" size="large" aria-label="about">
              <InfoIcon />
            </IconButton>
            <Link to={`/about/`}>AboutMe</Link>
          </li>
          <li>
            <IconButton color="inherit" size="large" aria-label="contact">
              <EmailIcon />
            </IconButton>
            <Link to={`/contact/`}>Contact</Link>
          </li>
        </UlWrapper>
        <div className={"displayMode"}>
          Display
          <Mode />
        </div>
      </Drawer>
    </DivWrapper>
  )
}

export default drawer
const DivWrapper = styled.div`
  .menuButton {
    margin-right: 0.5em;
  }

  div.drawerAdsense {
    width: 100%;
  }

  nav {
    background-color: var(--bgColorScondary) !important;
    width: 300px !important;
  }

  div.closeButton {
    text-align: end;
  }

  div.displayMode {
    padding-left: 8px;
  }
`
const UlWrapper = styled.ul`
  padding-top: 8px;
  padding-left: 8px;
  margin-bottom: 1em;

  li {
    margin-bottom: 1em;
  }

  ul.secondaryMenu {
    margin-left: 0.5em;
  }
`
