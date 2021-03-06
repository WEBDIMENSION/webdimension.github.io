import React from "react"
import { useLocation } from "@reach/router"
import Header from "./header"
import Footer from "./footer"
import Tags from "../components/tags"
import Mode from "../components/mode"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import styled from "styled-components"
import SidebarContent from "../components/sidebarContent"
import BioDescription from "./bioDescription"
import Drafts from "./drafts"
import IconButton from "@mui/material/IconButton"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import GoogleAdsense from "../components/google/googleAdsense"
import GoogleAdsenseHeader from "../components/google/googleAdsenseHeader"
import Topics from "../components/topics"
import { Link as Scroll } from "react-scroll"

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation()

  const rootPath = `/`
  const isRootPath = location?.pathname === rootPath
  return (
    <div
      data-is-root-path={isRootPath}
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--textNormal)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
      }}
    >
      <GoogleAdsenseHeader />
      <Grid container className="container" id={"page_top"}>
        <Grid item xs={12}>
          <Drafts />
          <Header />
          <DivWrapper className="contents">
            <div className={"page_top"}>
              <Scroll to={"page_top"} smooth={true} duration={600}>
                <IconButton>
                  <ArrowUpwardIcon />
                </IconButton>
              </Scroll>
            </div>
            <Grid
              container
              sx={{
                display: {
                  md: "flex",
                },
                flexDirection: {
                  md: "row-reverse",
                },
                marginTop: {
                  xs: "5em",
                  md: "0",
                },
              }}
            >
              <Grid item xs={12} md={8.5}>
                <main className="mainContent">{children}</main>
                <GoogleAdsense slotKey={"contentsLower"} />
              </Grid>
              <Grid
                item
                xs={12}
                md={3.5}
                className={"sideBar"}
                sx={{
                  pr: {
                    md: 1,
                  },
                }}
              >
                <Box
                  component="div"
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <div className={"modeWrap"}>
                    <Mode />
                  </div>
                </Box>
                <nav>
                  <SidebarContent title="TAGS">
                    <Tags isSideBar={true} />
                  </SidebarContent>
                </nav>
                <GoogleAdsense slotKey={"sideUpper"} />
                <nav>
                  <SidebarContent title="Topics">
                    <Topics isSideBar={true} />
                  </SidebarContent>
                </nav>
                <GoogleAdsense slotKey={"sideLower"} />
                {/*{(() => {*/}
                {/*  if (!isRootPath) {*/}
                {/*    return (*/}
                {/*      <>*/}
                <nav>
                  <SidebarContent title="ABOUT">
                    <BioDescription isSideBar={true} />
                  </SidebarContent>
                </nav>
                <GoogleAdsense slotKey={"sideLower"} />
                {/*      </>*/}
                {/*    )*/}
                {/*  } else {*/}
                {/*    return ""*/}
                {/*  }*/}
                {/*})()}*/}
              </Grid>
            </Grid>
          </DivWrapper>
          <Footer />
        </Grid>
      </Grid>
    </div>
  )
}
export default Layout
const DivWrapper = styled.div`
  a {
    text-decoration: underline;
  }

  margin-top: 0.5em;

  .modeWrap {
    font-size: var(--fontSizeH1);
    text-align: center;
  }

  .page_top {
    position: fixed;
    right: 12px;
    bottom: 12px;
    color: var(--fontColor);
    border: 1px var(--fontColor) solid;
    border-radius: 8px;
    background: var(--bgColorPrimary);
    padding: 8px;
    cursor: pointer;
    transition: 0.3s;

    button {
      color: var(--fontColor) !important;
    }
  }
`
