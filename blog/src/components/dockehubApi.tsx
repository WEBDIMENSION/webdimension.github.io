/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import styled from "styled-components"
import data from "../data/dockerhub/dockerhub.json"

const Dockerhub = ({ url }: { url: string | unknown | undefined }) => {
  console.log(data.results)
  return (
    <DivWrapper>
      <h4>DockerHub public repositories</h4>
      <ul>
        {data.results.map((repo: any) => (
          <li key={repo.name}>
            <a href={url + repo.name}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </DivWrapper>
  )
}

export default Dockerhub

const DivWrapper = styled.div``
