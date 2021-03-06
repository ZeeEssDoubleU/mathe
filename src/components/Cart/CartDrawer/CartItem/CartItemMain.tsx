import React, { ReactElement } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
// import components
const Icon = loadable(() => import("../../../Icon"))
// import store / types
import { CartItemI } from "../../../../api/shopify/graphql/types"
import { useCheckout, useCheckoutMutation } from "../../../../api/shopify"

// ************
// component
// ************

export default function CartItemMain({
	id,
	quantity,
	price,
}: CartItemI): ReactElement {
	const shopifyCheckoutQuery = useCheckout()
	const shopifyCheckoutMutation = useCheckoutMutation()

	// update line item in cart
	function updateLineItem(updatedQuantity: number) {
		const checkoutId = shopifyCheckoutQuery.checkout?.id
		const lineItems = [{ id, quantity: updatedQuantity }]
		if (checkoutId) {
			shopifyCheckoutMutation.updateLineItem.mutate({
				checkoutId,
				lineItems,
			})
		}
	}

	return (
		<Container>
			<span className="note">Quantity</span>
			<Quantity>
				<Selector>
					<button
						aria-label="decrement quantity"
						onClick={() => updateLineItem(quantity - 1)}
						className="change-quantity decrement"
						data-class="change-quantity decrement"
					>
						<Icon name="minus" />
					</button>
					<Count>{quantity}</Count>
					<button
						aria-label="increment quantity"
						onClick={() => updateLineItem(quantity + 1)}
						className="change-quantity increment"
						data-class="change-quantity increment"
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
	min-width: 134px;
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
