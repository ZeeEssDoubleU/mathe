import React, { ReactElement } from "react"
import loadable from "@loadable/component"
// import components
const CartDrawer = loadable(() => import("./CartDrawer"))
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
