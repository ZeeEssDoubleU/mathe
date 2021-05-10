import React, { ReactElement } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
// import components
const Icon = loadable(() => import("../Icon"))
// import styles
import { ModalButton } from "../../styles/elements"
// import store
import { useShopify } from "../../redux"
import { useCheckout } from "../../api/shopify"

// ************
// component
// ************

export default function CartToggle(): ReactElement {
	const shopifyState = useShopify()
	const shopifyCheckoutQuery = useCheckout()

	return (
		<Container
			className="toggle-cart"
			data-class="toggle-cart"
			aria-label="toggle cart"
			onClick={() => shopifyState.toggleCart(!shopifyState.isCartOpen)}
		>
			<Icon name="cart-zoom" />
			<span className="item-count">
				{shopifyCheckoutQuery.totalItemCount}
			</span>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(ModalButton)`
	top: 24px;
	right: 0;

	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		top: 7.5%;
	}
`
