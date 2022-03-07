import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import Mode from "./mode"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faTags,
  faBlog,
  faBellConcierge,
  faIdCard,
  faEnvelope,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
import ModalSearch from "./modalSearch"

const drawer = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <DivWrapper>
      <FontAwesomeIcon icon={faBars} className={"menuButton"} onClick={toggleDrawer} />
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <div className={"closeButton"}>
          <button onClick={toggleDrawer}>Close</button>
        </div>
        <UlWrapper className={"drawerMenu"}>
          <li>
            <FontAwesomeIcon icon={faHouse} />
            <Link to={`/`}>Top</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faBlog} />
            <Link to={`/blog/`}>Blog</Link>
          </li>
          <ul className={"secondaryMenu"}>
            <li>
              <FontAwesomeIcon icon={faTags} />
              <Link to={`/blog/tags/`}>Tags</Link>
            </li>
            <li>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <ModalSearch />
            </li>
            <li>
              <FontAwesomeIcon icon={faBellConcierge} />
              <Link to={`/blog/topics/`}>Topics</Link>
            </li>
          </ul>
          <li>
            <FontAwesomeIcon icon={faIdCard} />
            <Link to={`/about/`}>AboutMe</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
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
