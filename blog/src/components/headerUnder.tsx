import React from "react"
import styled from "styled-components"
import Box from "@mui/material/Box"
import Mode from "../components/mode"
import Drawer from "../components/drawer"

const headerUnder = () => {

  return (
    <DivWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "space-between",
            md: "end",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "left",
            width: {
              sm: "100%",
            },
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Mode />
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Drawer />
        </Box>
      </Box>
    </DivWrapper>
  )
}

export default headerUnder
const DivWrapper = styled.div``
