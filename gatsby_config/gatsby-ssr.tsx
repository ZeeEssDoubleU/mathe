import { RenderBodyArgs } from "gatsby"
import React from "react"
import WrapRoot from "../src/components/GatsbyAPI/WrapRoot"

// root element
export const wrapRootElement = WrapRoot

// render body
export const onRenderBody = ({
	setHeadComponents,
	setPostBodyComponents,
}: RenderBodyArgs): void => {
	const headComponents = [
		<link
			key="snipcart_pre_app"
			rel="preconnect"
			href="https://app.snipcart.com"
		/>,
		<link
			key="snipcart_pre_cdn"
			rel="preconnect"
			href="https://cdn.snipcart.com"
		/>,
		<link
			key="snipcart_style"
			rel="stylesheet"
			href="https://cdn.snipcart.com/themes/v3.0.28/default/snipcart.css"
		/>,
	]

	const bodyComponents = [
		<script
			async
			key="snipcart_js"
			src="https://cdn.snipcart.com/themes/v3.0.28/default/snipcart.js"
		/>,
		<div
			hidden
			key="snipcart_div"
			id="snipcart"
			data-config-add-product-behavior="none"
			data-config-modal-style="side"
			data-api-key={process.env.GATSBY_SNIPCART_API_KEY}
		/>,
	]

	setHeadComponents(headComponents)
	setPostBodyComponents(bodyComponents)
}