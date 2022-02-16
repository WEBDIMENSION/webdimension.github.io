import React from "react"
import styled from "styled-components"

const SidebarContent = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  return (
    <ContentWrapper>
      <h2>{title}</h2>
      <div className="sidebarContent">
        {children}
        {/*<SidebarContentBottom content="testBottom"/>*/}
      </div>
      <div className="bottomText" />
    </ContentWrapper>
  )
}

export default SidebarContent

const ContentWrapper = styled.div`
  margin-bottom: 1em;
  .sidebarContent {
    padding: 0.5em;
    background-color: var(--bgColorScondary);
    border: 1px var(--colorPrimary) solid;
    box-shadow: inset 0 0 30px -15px rgba(255, 255, 255, 0.4);
  }

  h2 {
    text-align: center;
    letter-spacing: 0.5em;
    background-color: var(--colorPrimary);
    font-weight: bolder;
    border-radius: 1em 1em 0 0;
    font-size: var(--fontSizeH3);
  }

  .bottomText {
    text-align: center;
    display: block;
    background-color: var(---colorPrimary);
    border-radius: 0 0 2px 2px;
    height: 2px;
  }
`
