import React, { ReactElement, useEffect, useState, useRef } from "react"
import { Helmet } from "react-helmet"
// import shopify
import Client from "shopify-buy"

// ************
// component
// ************

export default function Cart(): ReactElement {
	const client = useRef(null)

	useEffect(() => {
		client.current = Client.buildClient({
			domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.shopify.com`,
			storefrontAccessToken:
				process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
		})
	}, [])

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
