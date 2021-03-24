import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
// import styles
import { ModalButton } from "../../../styles/elements"

// ************
// component
// ************

export default function CartTab(): ReactElement {
	return (
		<Container className="snipcart-checkout">
			<Icon name="cart-zoom" />
			<ItemCount className="snipcart-items-count" />
		</Container>
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
