import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import CartItemHeader from "./CartItemHeader"
import CartItemMain from "./CartItemMain"
// import types
import { LineItem } from "shopify-buy"

// ************
// types
// ************

export interface CartItem_I {
	id: LineItem["id"]
	title: LineItem["title"]
	quantity: LineItem["quantity"]
	price: LineItem["price"]
}

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
