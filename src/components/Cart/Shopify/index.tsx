import React, { ReactElement } from "react"
// import components
import Cart from "./Cart"
import CartToggle from "./CartToggle"

// ************
// component
// ************

export default function Snipcart(): ReactElement {
	return (
		<>
			<CartToggle />
			<Cart />
		</>
	)
}
