import React, { ReactElement } from "react"
// import components
import CartDrawer from "./CartDrawer"
import CartToggle from "./CartToggle"

// ************
// component
// ************

export default function Cart(): ReactElement {
	return (
		<>
			<CartToggle />
			<CartDrawer />
		</>
	)
}
