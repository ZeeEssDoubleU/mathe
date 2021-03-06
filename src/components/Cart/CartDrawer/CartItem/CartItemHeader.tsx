import React, { ReactElement } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
// import components
const Icon = loadable(() => import("../../../Icon"))
// import store / queries / types
import { CartItemI } from "../../../../api/shopify/graphql/types"
import { useCheckout, useCheckoutMutation } from "../../../../api/shopify"

// ************
// component
// ************

export default function CartItemHeader({ id, title }: CartItemI): ReactElement {
	const shopifyCheckoutQuery = useCheckout()
	const shopifyCheckoutMutation = useCheckoutMutation()

	// remove line item from cart
	function removeLineItem() {
		const checkoutId = shopifyCheckoutQuery.checkout?.id
		const lineItemIds = [String(id)]
		if (checkoutId) {
			shopifyCheckoutMutation.removeLineItem.mutate({
				checkoutId,
				lineItemIds,
			})
		}
	}

	return (
		<Container>
			<Title>{title}</Title>
			<button
				aria-label="remove item"
				onClick={removeLineItem}
				className="remove-item"
				data-class="remove-item"
			>
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
