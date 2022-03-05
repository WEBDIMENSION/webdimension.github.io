/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import styled from "styled-components"
import data from "../data/dockerhub/dockerhub.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDocker } from "@fortawesome/free-brands-svg-icons"

const Dockerhub = ({ url }: { url: string | unknown | undefined }) => {
  return (
    <DivWrapper>
      <h4>
        <FontAwesomeIcon icon={faDocker} />
        DockerHub public repositories
      </h4>
      <ul>
        {data.results.map((repo: any) => (
          <li key={repo.name}>
            <a href={url + repo.user + "/" + repo.name} target={"_blank"} rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </DivWrapper>
  )
}

export default Dockerhub

const DivWrapper = styled.div``
