import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
// import store
import { useShopify } from "../../../store"

// ************
// component
// ************

export default function CartFooter(): ReactElement {
	const shopify = useShopify()
	const checkoutUrl = shopify.checkout?.webUrl
	const subtotalPrice = shopify.checkout?.subtotalPriceV2?.amount

	return (
		<Container>
			<Subtotal>
				<span>Subtotal</span>
				<span>
					{Number(subtotalPrice) === 0 ? "──" : `$${subtotalPrice}`}
				</span>
			</Subtotal>
			{/* <Tax>
				<span>Tax</span>
				<span>{Number(totalTax) === 0 ? "─" : `$${totalTax}`}</span>
			</Tax>
			<Total>
				<span>Total</span>
				<span>{Number(totalPrice) === 0 ? "──" : `$${totalPrice}`}</span>
			</Total> */}
			<Checkout
				// TODO: QUERY: make is cart empty available
				disabled={shopify.isCartEmpty}
				onClick={() =>
					!checkoutUrl ? null : window.location.replace(checkoutUrl)
				}
			>
				<span className="spacer" />
				<span className="shift">Checkout</span>
				<span className="spacer shift">
					<Icon name="forward-chevron" />
				</span>
			</Checkout>

			<span className="footnote">
				* Taxes and shipping calculated at checkout
			</span>
		</Container>
	)
}

// ************
// styles
// ************

const Checkout = styled.button<{ disabled: boolean }>`
	display: grid;
	grid-template-columns: 1fr auto 1fr;

	width: 100%;
	padding: 16px 32px;
	margin-top: 8px;
	border: none;
	border-radius: 0.25em;

	background: ${({ theme }) => theme.color.app_green};
	color: white;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};

	cursor: ${(props) => (props.disabled ? "default" : "pointer")};

	svg {
		height: 16px;
		width: 16px;
		fill: white;
		vertical-align: middle;
	}

	.shift {
		transition: transform 300ms;
	}

	&:hover {
		.shift {
			transform: translateX(${(props) => (props.disabled ? 0 : "5px")});
		}
	}
`
const Container = styled.footer`
	display: grid;
	grid-gap: 8px;
	padding: ${({ theme }) => theme.spacing.cart_padding};

	.footnote {
		text-align: center;
		font-size: 14px;
	}
`
const Subtotal = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;

	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
// const Tax = styled.div`
// 	display: grid;
// 	grid-template-columns: auto auto;
// 	justify-content: space-between;

// 	font-family: ${({ theme }) => theme.font.accent_cart};
// 	font-size: 14px;
// `
// const Total = styled.div`
// 	display: grid;
// 	grid-template-columns: auto auto;
// 	justify-content: space-between;

// 	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
// `
