/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import styled from "styled-components"

const SideBarContentBottom = ({ children }: { children?: React.ReactNode }) => {
  return <Pwrapper className="sideBarLink">{children}</Pwrapper>
}

export default SideBarContentBottom
const Pwrapper = styled.p`
  border-top: 1px var(--fontColor) dotted;
  text-align: end;
  margin-top: 0.5em;
  padding-top: 0.2em;
  padding-right: 1em;
`
