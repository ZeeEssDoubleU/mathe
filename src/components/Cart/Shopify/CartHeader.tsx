import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icon"
// import store
import { useShopify } from "../../../redux"

// ************
// component
// ************

export default function CartHeader(): ReactElement {
	const shopifyState = useShopify()

	return (
		<Container>
			<h2>Cart Summary</h2>
			<button
				className="gtm close-cart"
				aria-label="close cart"
				onClick={() => shopifyState.toggleCart(false)}
			>
				<Icon name="plus" />
			</button>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.header`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	align-items: center;

	min-height: 96px;
	padding: ${({ theme }) => theme.spacing.cart_padding};

	background: ${({ theme }) => theme.color.accent_light};

	h2 {
		font-size: 18px;
	}

	.close-cart {
		display: grid;
		align-items: center;

		padding: 4px;
		border: 1px solid ${({ theme }) => theme.color.accent_light};
		border-radius: 0.25em;

		background: none;
		cursor: pointer;

		svg {
			height: 30px;
			width: 30px;
			transform: rotate(45deg);
			fill: ${({ theme }) => theme.color.font_dark};
		}
	}
`
