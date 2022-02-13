import React from "react"
import styled from "styled-components"

const PostArticle = ({ children }: { children?: any }) => {
  return <ArticleWrapper>{children}</ArticleWrapper>
}

export default PostArticle

const ArticleWrapper = styled.article`
  section {
    background-color: var(--bgColorScondary);
    border-radius: 0.5em;
    padding: 0.4em;
    margin-bottom: 1.5em;
  }
`
