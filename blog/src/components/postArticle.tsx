import React from "react"
import styled from "styled-components"

const PostArticle = ({ children }: { children?: React.ReactNode }) => {
  return <ArticleWrapper>{children}</ArticleWrapper>
}

export default PostArticle

const ArticleWrapper = styled.article`
  section {
    background-color: var(--bgColorScondary);
    border-radius: 0.5em;
    padding: 3px;
    margin-bottom: 1.5em;
  }
`
