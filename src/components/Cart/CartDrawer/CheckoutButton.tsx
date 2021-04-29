import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icon"
// import store
import { useCheckout } from "../../../api/shopify"

// ************
// component
// ************

export default function CheckoutButton(): ReactElement {
	const shopifyCheckoutQuery = useCheckout()
	const checkoutUrl = shopifyCheckoutQuery.checkout?.webUrl
	const checkoutDisabled = !checkoutUrl || shopifyCheckoutQuery.isCartEmpty

	return (
		<Container
			className="checkout-link"
			data-class="checkout-link"
			disabled={checkoutDisabled} // a tag can't actually be disabled, using for styled below
			data-disabled={checkoutDisabled}
			onClick={(e) => checkoutDisabled && e.preventDefault()}
			href={checkoutUrl}
		>
			<span className="spacer" />
			<span className="shift">Checkout</span>
			<span className="spacer shift">
				<Icon name="forward-chevron" />
			</span>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.a<{ disabled: boolean }>`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	justify-items: center;
	color: white;

	width: 100%;
	padding: 16px 32px;
	margin-top: 8px;
	border: none;
	border-radius: 0.25em;

	background: ${({ theme }) => theme.color.app_green};
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};

	cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
	/* pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")}; */

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
			transform: translateX(${({ disabled }) => (disabled ? 0 : "5px")});
		}
	}
`
