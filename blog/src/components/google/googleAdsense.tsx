import React, { useEffect } from "react"
import styled from "styled-components"
import { useLocation } from "@reach/router"

export const GoogleAds = () => {
  const location = useLocation()
  const path = location?.pathname || ""

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [path])

  if (process.env.NODE_ENV == "development") {
    return (
      <AsideWrapper className={"adArea"}>
        <div className={"adsenseDummy"}>
          <span>Adsense</span>
        </div>
      </AsideWrapper>
    )
  } else {
    return (
      <AsideWrapper className={"adArea"}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.GOOGLE_ADSENSE_TRACKING_ID}
          data-ad-slot="4206718020"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </AsideWrapper>
    )
  }
}
export default GoogleAds

const AsideWrapper = styled.div`
  margin: 1em 0;

  div.adsenseDummy {
    width: 100%;
    line-height: 200px;
    text-align: center;
    background-color: #f5f2f0;
    color: #333333;

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
`
