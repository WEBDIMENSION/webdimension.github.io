import React, {useEffect} from "react"
import styled from "styled-components"
import {useLocation} from "@reach/router"

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[]
  }
}

export const GoogleAds = ({slotKey}: { slotKey: string }) => {
  console.log(slotKey)
  const getSlot = (slotKey: string) => {
    const sideUpper: unknown = process.env.GOOGLE_ADSENSE_SLOT_SIDE_UPPER
    const sideLower: unknown = process.env.GOOGLE_ADSENSE_SLOT_SIDE_LOPER
    const contentsLower: unknown = process.env.GOOGLE_ADSENSE_SLOT_CONTENTS_LOWPER
    switch (slotKey) {
      case "sideUpper":
        return sideUpper
      case "sideLower":
        return sideLower
      case "contentsLower":
        return contentsLower
      default:
    }
  }

  const location = useLocation()
  const path = location?.pathname || ""

  if (process.env.NODE_ENV == "development") {
    return (
      <AsideWrapper className={"adArea"}>
        <div className={"adsenseDummy"}>
          <span>Adsense</span>
        </div>
      </AsideWrapper>
    )
  } else {
    useEffect(() => {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }, [path])


    return (
      <AsideWrapper className={"adArea"}>
        <ins
          className="adsbygoogle"
          style={{display: "block"}}
          data-ad-client={process.env.GOOGLE_ADSENSE_TRACKING_ID}
          data-ad-slot={getSlot(slotKey)}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </AsideWrapper>
    )
  }
}
export default GoogleAds

const AsideWrapper = styled.aside`
  margin: 1em 0;
  height: 250px;

  .adArea {
    width: 100%;
  }

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
