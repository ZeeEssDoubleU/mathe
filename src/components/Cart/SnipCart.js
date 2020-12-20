import React from "react"
import { Helmet } from "react-helmet"

export default function SnipCart({ children }) {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.css"
        />
      </Helmet>
      {children}
      <script
        async
        src="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.js"
      ></script>
      <div
        id="snipcart"
        data-config-modal-style="side"
        data-api-key="MDgzN2Q0MDEtYmQxYy00MzllLWI4ZTMtZjI3YTYwZjViMTAyNjM3NDE0OTI3MTQ0OTg4MjE0"
        hidden
      ></div>
    </>
  )
}
