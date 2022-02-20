import * as React from "react"
import styled from "styled-components"
import GoogleAdsense from "./google/googleAdsense"

const PageTitle = ({ title, prefixTitle }: { title: string; prefixTitle: string }) => {
  return (
    <>
      <DivWrapper className="pageTitle">
        {(() => {
          if (prefixTitle) {
            return <div className="prefix">{prefixTitle}:</div>
          } else {
            return ""
          }
        })()}
        <h1>{title}</h1>
      </DivWrapper>
      <GoogleAdsense slotKey={"contentsLower"} />
    </>
  )
}
export default PageTitle
const DivWrapper = styled.div`
  margin-bottom: 0;
  display: flex;

  .prefix {
    font-size: var(--fontSizeH1);
    margin-right: 0.5em;
  }
`
