import React from "react"
import {Switch} from "@mui/material"
import useDarkMode from 'use-dark-mode';
import styled from "styled-components"
// import {ThemeProvider} from "@emotion/react";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // primary: deepPurple[50],
    secondary: {
      main: '#0f0',
    }
  }
})
;


const DarkModeToggle = () => {

  const darkMode = useDarkMode(true);

  return (
    <DarkModeSwitch>
      <ThemeProvider theme={theme}>
        <Switch
          checked={darkMode.value}
          onChange={darkMode.toggle}
          color={'secondary'}
        />
        Dark
      </ThemeProvider>
    </DarkModeSwitch>
  );
};

export default DarkModeToggle
const DarkModeSwitch = styled.div`
  text-align: end;
`