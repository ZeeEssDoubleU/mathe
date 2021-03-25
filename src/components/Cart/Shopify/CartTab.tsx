import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
// import styles
import { ModalButton } from "../../../styles/elements"
// import store
import { useShopify } from "../../../store"

// ************
// component
// ************

export default function CartTab(): ReactElement {
	const state_shopify = useShopify()

	return (
		<Container
			className="snipcart-checkout"
			onClick={() => state_shopify.toggleCart(!state_shopify.isCartOpen)}
		>
			<Icon name="cart-zoom" />
			<ItemCount className="snipcart-items-count" />
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
const ItemCount = styled.span``
