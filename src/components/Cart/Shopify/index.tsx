import React, { ReactElement } from "react"
// import components
import Cart from "./Cart"
import CartTab from "./CartTab"

// ************
// component
// ************

export default function Snipcart(): ReactElement {
	return (
		<>
			<CartTab />
			<Cart />
		</>
	)
}
