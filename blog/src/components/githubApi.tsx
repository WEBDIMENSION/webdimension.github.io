import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"

const GitHubApi = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.github.com/users/webdimension/repos",
      headers: {
        "Content-Type": "application/json",
        // "X-Requested-With": "XMLHttpRequest",
      },
    }).then(resp => {
      setData(resp.data)
      setLoading(false)
    })
  }, [])
  if (loading) {
    return <div />
  }
  return (
    <DivWrapper className="githubRepos">
      <h4>GitHub public repositories</h4>
      <ul>
        {data.map((repo: any) => {
          return (
            <li key={repo.html_url}>
              <a href={repo.html_url} target={"_blank"} rel="noreferrer">
                {repo.name}
              </a>
            </li>
          )
        })}
      </ul>
    </DivWrapper>
  )
}
export default GitHubApi

const DivWrapper = styled.div``
