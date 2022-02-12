import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import IconButton from "@mui/material/IconButton"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import kebabCase from "lodash/kebabCase"

const PostList = ({ nodes }: { nodes: any }) => {
  return (
    <OlWrapper>
      {nodes.map(node => {
        const title = node.frontmatter?.title || node.fields?.slug

        return (
          <li key={node.fields?.slug} className={"postList"}>
            <article
              className="post-list-item"
            >
              <h2>
                <Link to={"/blog" + node.fields?.slug || ""} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
              </h2>
              <p className="post_modified">
                <span>{node.frontmatter?.post_modified}</span>
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter?.description || node?.excerpt || "",
                }}
                itemProp="description"
              />
              <ul className={"tags"}>
                {node.frontmatter?.tags?.map(tag => {
                  return (
                    <li key={tag}>
                      <IconButton>
                        <LocalOfferIcon />
                      </IconButton>
                      <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  )
                })}
              </ul>
            </article>
          </li>
        )
      })}
    </OlWrapper>
  )
}

export default PostList

const OlWrapper = styled.ol`
  P.post_modified {
    text-align: end;

    span {
      color: var(--colorSecondary);
    }
  }

  li.postList {
    background-color: var(--bgColorScondary);
    border-radius: 8px;
    margin-bottom: 2em;
    padding: 0.5em;
    box-shadow: inset 0 0 30px -15px rgba(255, 255, 255, 0.4);
  }

  h2 {
    background-color: var(--colorPrimary);
    border-radius: 8px;
    padding: 0 4px;
  }

  .tags {
    display: flex;
    justify-content: flex-end;

    li {
      margin-left: 1em;
      button {
        color: var(--fontColor) !important;
      }
    }
  }
`
