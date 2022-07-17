import React from "react"

export const GoogleAdsHeader = () => {
  if (process.env.NODE_ENV != "development") {
    return (
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={process.env.GOOGLE_ADSENSE_TRACKING_ID}"
        crossOrigin="anonymous"
      ></script>
    )
  }
}

export default GoogleAdsHeader
