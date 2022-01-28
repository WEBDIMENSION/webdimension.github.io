import React from "react"
import {Switch} from "@mui/material"
import useDarkMode from 'use-dark-mode';
import styled from "styled-components"
// import {ThemeProvider} from "@emotion/react";
// import {createTheme, ThemeProvider} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Mode from "../components/mode";



const headerUnder = () => {

  const darkMode = useDarkMode(true);

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
          <div>menu</div>
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