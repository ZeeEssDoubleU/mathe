import { RenderBodyArgs } from "gatsby"
import React from "react"
import WrapRoot from "../src/components/GatsbyAPI/WrapRoot"

// root element
export const wrapRootElement = WrapRoot

// render body
export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs): void => {
	const headComponents = [
		<link
			key="snipcart_app_preconnect"
			rel="preconnect"
			href="https://app.snipcart.com"
		/>,
		<link
			key="snipcart_cdn_preconnect"
			rel="preconnect"
			href="https://cdn.snipcart.com"
		/>,
	]

	setHeadComponents(headComponents)
}
