import React, { ReactElement } from "react"
// import components
import Cart from "./Cart"
import CartTab from "./CartTab"
// import styles
import CartStyle from "./style"

export default function Snipcart(): ReactElement {
	return (
		<>
			<CartStyle />
			<Cart />
			<CartTab />
		</>
	)
}
