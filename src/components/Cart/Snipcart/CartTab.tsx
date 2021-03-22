import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
import Cart from "./Cart"
// import styles
import { ModalButton } from "../../../styles/elements"
import SnipcartStyle from "./style"

// ************
// component
// ************

export default function CartTab(): ReactElement {
	return (
		<>
			<SnipcartStyle />
			<Container className="snipcart-checkout">
				<Icon name="cart-zoom" />
				<ItemCount className="snipcart-items-count" />
			</Container>
			<Cart />
		</>
	)
}

// ************
// styles
// ************

const Container = styled(ModalButton)`
	top: 1.5rem;

	@media (min-width: ${({ theme }) => theme.tablet}px) {
		top: 7.5%;
	}
`
const ItemCount = styled.span``
