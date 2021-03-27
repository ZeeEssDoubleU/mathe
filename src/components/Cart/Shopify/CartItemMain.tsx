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

export default function CartItemMain({
	id,
	quantity,
	price,
}: CartItem_I): ReactElement {
	const state_shopify = useShopify()

	// update line item in cart
	function updateLineItem(updatedQuantity: number) {
		const checkoutId = state_shopify.checkoutId
		const lineItems = [{ id, quantity: updatedQuantity }]
		state_shopify.updateLineItem({ checkoutId, lineItems })
	}

	return (
		<Container>
			<span className="note">Quantity</span>
			<Quantity>
				<Selector>
					<button
						aria-label="decrement quantity"
						className="change-quantity"
						onClick={() => updateLineItem(quantity - 1)}
					>
						<Icon name="minus" />
					</button>
					<Count>{quantity}</Count>
					<button
						aria-label="increment quantity"
						className="change-quantity"
						onClick={() => updateLineItem(quantity + 1)}
					>
						<Icon name="plus" />
					</button>
				</Selector>
				<Price>${Number(Number(price) * quantity).toFixed(2)}</Price>
			</Quantity>
		</Container>
	)
}

// ************
// component
// ************

const Container = styled.main`
	.note {
		font-family: ${({ theme }) => theme.font.accent_cart};
		font-size: 12px;
	}
`
const Count = styled.span`
	display: grid;
	justify-content: center;
	align-items: center;

	height: 100%;
	border-left: 1px solid ${({ theme }) => theme.color.accent_light};
	border-right: 1px solid ${({ theme }) => theme.color.accent_light};

	font-size: 14px;
`
const Price = styled.span`
	font-size: 14px;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
const Quantity = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	justify-content: space-between;
	align-items: center;
`
const Selector = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;

	height: 48px;
	width: 50%;
	max-width: 160px;
	border: 1px solid ${({ theme }) => theme.color.accent_light};
	border-radius: 0.25em;

	overflow: hidden;

	button {
		display: grid;
		align-items: center;

		height: 100%;
		padding: 0 0.75em;
		border: none;

		background: none;
		cursor: pointer;

		svg {
			height: 20px;
			width: 20px;
		}

		&:hover {
			background: ${({ theme }) => theme.color.accent_light};
		}
	}
`
