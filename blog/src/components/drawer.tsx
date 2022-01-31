import React from "react"
import {Link} from "gatsby"
import styled from "styled-components"
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import IconButton from '@mui/material/IconButton';
import {Menu} from '@mui/icons-material';

const drawer = () => {

  // const darkMode = useDarkMode(true);
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <DivWrapper>
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
        size="large"
        aria-label="menu"
      >
        <Menu/>
      </IconButton>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
      >
        <div className={"closeButton"}>
          <button onClick={toggleDrawer}>Close</button>
        </div>
        <UlWrapper className={"drawerMenu"}>
          <li>
            <Link to={`/`}>Top</Link>
          </li>
          <li>
            <Link to={`/blog`}>Blog</Link>
          </li>
          <ul className={"secondaryMenu"}>
            <li>
              <Link to={`/blog/tags`}>Tags</Link>
            </li>
          </ul>
          <li>
            <Link to={`/about`}>AboutMe</Link>
          </li>
          <li>
            <Link to={`/contact`}>Contact</Link>
          </li>
        </UlWrapper>
      </Drawer>
    </DivWrapper>
  )
    ;
};

export default drawer
const DivWrapper = styled.div`
  nav {
    background-color: var(--bgColorScondary) !important;
    opacity: 0.95;
    width: 300px !important;
  }

  div.closeButton {
    text-align: end;
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
