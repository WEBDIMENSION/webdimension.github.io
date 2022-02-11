import React, { useEffect } from 'react'

export const GoogleAds = ({ path }) => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [path])

  return (
    <ins
      className="adsbygoogle"
      style={{ "display": "block"}}
      data-ad-client={process.env.GOOGLE_ADSENSE_TRACKING_ID}
      data-ad-slot="4206718020"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
export default GoogleAds
