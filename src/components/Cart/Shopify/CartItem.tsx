import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import CartItemHeader from "./CartItemHeader"
import CartItemMain from "./CartItemMain"
// import types
import { CartItem_I } from "../../../store/shopifySlice/graphql/@types"

// ************
// component
// ************

export default function CartItem(props: CartItem_I): ReactElement {
	return (
		<Container>
			<CartItemHeader {...props} />
			<CartItemMain {...props} />
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
