import React, { ReactElement } from "react"
import { Helmet } from "react-helmet"

// ************
// component
// ************

export default function Cart(): ReactElement {
	return (
		<>
			<Helmet>
				{/* preconnect to below scripts / links in gatsby-ssr */}
				{/* load CSS async */}
				{/* https://www.npmjs.com/package/fg-loadcss */}
				<link
					key="snipcart_style"
					rel="stylesheet"
					href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css"
					media="print"
					onLoad="this.media='all'"
				/>
				<script
					async
					key="snipcart_js"
					src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"
				/>
			</Helmet>
			<div
				hidden
				key="snipcart_div"
				id="snipcart"
				data-config-add-product-behavior="none"
				data-config-modal-style="side"
				data-api-key={process.env.GATSBY_SNIPCART_API_KEY}
			/>
		</>
	)
}
