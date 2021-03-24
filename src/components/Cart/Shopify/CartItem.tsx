import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
import CartItemHeader from "./CartItemHeader"
import CartItemMain from "./CartItemMain"

// ************
// component
// ************

export default function CartItem(): ReactElement {
	return (
		<Container>
			<CartItemHeader />
			<CartItemMain />
		</Container>
	)
}

// ************
// component
// ************

const Container = styled.div`
	display: grid;
	gap: 12px;

	padding: ${({ theme }) => theme.spacing.cart_padding};
	border-bottom: 1px solid ${({ theme }) => theme.color.accent_light};
`
