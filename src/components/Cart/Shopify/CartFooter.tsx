import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"

// ************
// component
// ************

export default function CartFooter(): ReactElement {
	return (
		<Container>
			<Subtotal>
				<span>Subtotal</span>
				<span>$10.00</span>
			</Subtotal>
			<Tax>
				<span>Tax</span>
				<span>$1.00</span>
			</Tax>
			<Total>
				<span>Total</span>
				<span>$11.00</span>
			</Total>
			<Checkout>
				<span className="spacer" />
				Checkout
				<span className="spacer">
					<Icon name="forward-chevron" />
				</span>
			</Checkout>
		</Container>
	)
}

// ************
// styles
// ************

const Checkout = styled.button`
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

	svg {
		height: 16px;
		width: 16px;
		fill: white;
		vertical-align: middle;
	}
`
const Container = styled.footer`
	display: grid;
	grid-gap: 8px;
	padding: ${({ theme }) => theme.spacing.cart_padding};
`
const Subtotal = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;

	font-family: ${({ theme }) => theme.font.accent_cart};
	font-size: 14px;
`
const Tax = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;

	font-family: ${({ theme }) => theme.font.accent_cart};
	font-size: 14px;
`
const Total = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;

	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
