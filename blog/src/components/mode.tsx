import React from "react"
import { Switch } from "@mui/material"
import useDarkMode from "use-dark-mode"
import styled from "styled-components"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import WbSunnyIcon from "@mui/icons-material/WbSunny"

const theme = createTheme({
  palette: {
    warning: {
      main: "#CBEDCB",
    },
    primary: {
      main: "#FFA500",
    },
    secondary: {
      main: "#B2B200",
    },
  },
})
const DarkModeToggle = () => {
  const darkMode = useDarkMode(true)

  return (
    <DarkModeSwitch>
      <ThemeProvider theme={theme}>
        <IconButton
          size="large"
          aria-label="light"
          onClick={darkMode.toggle}
          color={"primary"}
        >
          <WbSunnyIcon />
        </IconButton>
        <Switch
          checked={darkMode.value}
          onChange={darkMode.toggle}
          color={"warning"}
        />
        <IconButton
          size="large"
          aria-label="dark"
          onClick={darkMode.toggle}
          color={"secondary"}
        >
          <DarkModeIcon />
        </IconButton>
      </ThemeProvider>
    </DarkModeSwitch>
  )
}

export default DarkModeToggle
const DarkModeSwitch = styled.div``
