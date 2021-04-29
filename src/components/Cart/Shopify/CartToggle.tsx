import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icon"
// import styles
import { ModalButton } from "../../../styles/elements"
// import store
import { useShopify } from "../../../redux"
import { useCheckout } from "../../../api/shopify"

// ************
// component
// ************

export default function CartToggle(): ReactElement {
	const shopifyState = useShopify()
	const shopifyCheckoutQuery = useCheckout()

	return (
		<Container
			className="gtm toggle-cart"
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

	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		top: 7.5%;
	}
`
