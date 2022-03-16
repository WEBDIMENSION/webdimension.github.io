/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import SideBarContentBottom from "../components/sideBarContentBottom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIdCard } from "@fortawesome/free-solid-svg-icons"

const BioDescription = ({ isSideBar }: { isSideBar: boolean }) => {
  return (
    <DivWrapper className="bio">
      WEBエンジニア(第一世代)のおっさんが現在のWEBにしがみつく奮闘記。
      <br />
      実経験の備忘録。
      <br />
      {isSideBar ? (
        <SideBarContentBottom>
          <FontAwesomeIcon icon={faIdCard} size="1x" />
          <Link to={`/about/`}>AboutMe</Link>
        </SideBarContentBottom>
      ) : (
        ""
      )}
    </DivWrapper>
  )
}

export default BioDescription
const DivWrapper = styled.div`
  word-wrap: break-word;
`
