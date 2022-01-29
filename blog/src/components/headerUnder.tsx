import React from "react"
import {Switch} from "@mui/material"
import useDarkMode from 'use-dark-mode';
import styled from "styled-components"
// import {ThemeProvider} from "@emotion/react";
// import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Mode from "../components/mode";
import Drawer from "../components/drawer";


const headerUnder = () => {

  // const darkMode = useDarkMode(true);
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const style = {
    width: "50%",
    margin: "0 auto",
  };

  return (
    <DivWrapper>
      <Box sx={{
        display: 'flex',
        justifyContent: {
          xs: 'space-between',
          md: 'end'
        }
      }}>
        <Box sx={{
          display: {
            xs: 'block',
            md: 'none',
          }
        }}>
          <Drawer/>
        </Box>
        <Box sx={{
          textAlign: 'right',
          width: {
            sm: "100%",
          }
        }}>
          <Mode/>
        </Box>
      </Box>
    </DivWrapper>
  );
};

export default headerUnder
const DivWrapper = styled.div`
`