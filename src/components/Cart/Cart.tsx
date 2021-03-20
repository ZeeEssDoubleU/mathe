import React from "react"
import { Helmet } from "react-helmet"

const Cart = (props) => {
	return (
		<>
			<Helmet>
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

export default Cart
