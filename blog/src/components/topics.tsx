/**
 * Tags component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import SideBarContentBottom from "./sideBarContentBottom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons"

const Topics = ({ isSideBar }: { isSideBar: boolean }) => {
  const data = useStaticQuery<GatsbyTypes.ActiveTopicsQuery>(graphql`
    query ActiveTopics {
      allTopicsJson {
        edges {
          node {
            title
            description
            url
            totalPages
          }
        }
      }
    }
  `)

  const topics = data.allTopicsJson.edges
  return (
    <DivWrapper>
      <ul>
        {topics.map((topic: any) => (
          <li key={topic.node.url}>
            <h3>
              <Link to={topic.node.url}>{topic.node.title}</Link>
            </h3>
            <p className={"topicDescription"}>
              {topic.node.description}
              <span className={"topicTotalPage"}>(全{topic.node.totalPages}ページ)</span>
            </p>
          </li>
        ))}
      </ul>
      {isSideBar ? (
        <SideBarContentBottom>
          <FontAwesomeIcon icon={faBellConcierge} size="1x" />
          <Link to={`/blog/topics/`}>All Topics</Link>
        </SideBarContentBottom>
      ) : (
        ""
      )}
    </DivWrapper>
  )
}

export default Topics

const DivWrapper = styled.div`
  margin: 1em 0;
  font-size: 1em;
  line-height: 2em;
  text-align: center;
  padding: 8px;

  ul {
    li {
      margin-bottom: 2em;
      //border-top: 1px var(--colorSecondary) solid;
      border-bottom: 1px var(--fontColor) solid;
      padding: 1em 0;
    }
  }

  p.topicDescription {
    padding: 8px;
    margin-top: 8px;
    border-top: 1px var(--fontColor) dashed;
  }

  span.topicTotalPage {
    text-align: right;
    font-size: 0.9em;
    margin-left: 1em;
  }

  h2 {
    font-size: var(--fontSizeH1);
    text-align: center;
    margin-bottom: 0.5em;
  }

  a {
    text-decoration: none;
  }
`
