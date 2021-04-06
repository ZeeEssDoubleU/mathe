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
	const shopify = useShopify()

	return (
		<Container onClick={() => shopify.toggleCart(!shopify.isCartOpen)}>
			<Icon name="cart-zoom" />
			<span className="item-count">{shopify.totalItemCount}</span>
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
