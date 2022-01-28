// import * as React from "react"
import React from "react"
import {useLocation} from "@reach/router"
import Header from "./header"
import Footer from "./footer"
// import Bio from "../components/bio"
import Tags from "../components/tags"
import Mode from "../components/mode"
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components"
import SidebarContent from "../components/sidebarContent"
import BioDescription from "./bioDescription";
import HeaderUnder from "./headerUnder";

// import {Link} from "gatsby";
// import Mode from "../components/mode"
// import {PageProps} from "gatsby";

// const Layout = ({location, children) => {
const Layout = ({children}: { children?: React.ReactNode }) => {
// const Layout: React.FC<PageProps> = ({ location },{ children }: { children?: React.ReactNode }) => {

  const location = useLocation();

  const rootPath = `/`
  const isRootPath = location?.pathname === rootPath
  return (

    <div data-is-root-path={isRootPath}
         style={{
           backgroundColor: 'var(--bg)',
           color: 'var(--textNormal)',
           transition: 'color 0.2s ease-out, background 0.2s ease-out',
         }}
    >
      <Grid container className="container">
        <Grid item xs={12}>
          <Header/>
          <HeaderUnder/>
          <DivWrapper>
            <Grid container>
              <Grid item xs={12} md={3} className={"sideBar"}>
                <Box sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  }
                }}>
                  <nav>
                    <SidebarContent title="ABOUT">
                      <BioDescription isSideBar={true}/>
                    </SidebarContent>
                    <SidebarContent title="TAGS">
                      <Tags isSideBar={true}/>
                    </SidebarContent>
                  </nav>
                </Box>
              </Grid>
              <Grid item xs={12} md={9}>
                <main className="mainContent">
                  {children}
                </main>
              </Grid>
            </Grid>
          </DivWrapper>
          <Footer/>
        </Grid>
      </Grid>
    </div>
  )
}
export default Layout
const DivWrapper = styled.div`
  margin-top: 0.5em;
  .sideBar {
    padding-right: 12px;
  }

  .mainContent {
    //margin-left: 1.2em;
    //padding: 8px;
  }
  
`

