import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
// import store
import { useShopify } from "../../../store"
// import types
import { CartItem_I } from "./CartItem"

// ************
// component
// ************

export default function CartItemHeader({
	id,
	title,
}: CartItem_I): ReactElement {
	const state_shopify = useShopify()

	// remove line item from cart
	function removeLineItem() {
		const checkoutId = state_shopify.checkoutId
		const lineItemIds = [String(id)]
		state_shopify.removeLineItem({ checkoutId, lineItemIds })
	}

	return (
		<Container>
			<Title>{title}</Title>
			<button className="remove-item" onClick={removeLineItem}>
				<Icon name="trashcan" />
			</button>
		</Container>
	)
}

// ************
// component
// ************

const Container = styled.header`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	align-items: center;

	.remove-item {
		display: grid;
		align-items: center;

		padding: 4px;
		border: 1px solid ${({ theme }) => theme.color.accent_light};
		border-radius: 0.25em;

		background: none;
		cursor: pointer;

		svg {
			height: 20px;
			width: 20px;
			fill: red;
		}

		&:hover {
			background: ${({ theme }) => theme.color.accent_light};
		}
	}
`
const Title = styled.h3`
	font-size: 18px;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
