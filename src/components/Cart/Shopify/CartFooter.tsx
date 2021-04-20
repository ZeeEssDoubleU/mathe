import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import CheckoutButton from "./CheckoutButton"
import AcceptedPayments from "./AcceptedPayments"
// import store
import { useCheckout } from "../../../api/shopify"

// ************
// component
// ************

export default function CartFooter(): ReactElement {
	const shopifyCheckoutQuery = useCheckout()
	const subtotalPrice = shopifyCheckoutQuery.checkout?.subtotalPriceV2?.amount

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
			<CheckoutButton />

			<span className="footnote">
				* Taxes and shipping calculated at checkout
			</span>
			<AcceptedPayments />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.footer`
	display: grid;
	grid-gap: 8px;
	padding: ${({ theme }) => theme.spacing.cart_padding};
	padding-bottom: calc(${({ theme }) => theme.spacing.cart_padding} / 2);

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
