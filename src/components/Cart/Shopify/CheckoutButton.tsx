import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"
// import store
import { useCheckout } from "../../../api/shopify"

// ************
// component
// ************

export default function CheckoutButton(): ReactElement {
	const shopifyCheckoutQuery = useCheckout()
	const checkoutUrl = shopifyCheckoutQuery.checkout?.webUrl

	return (
		<Container
			disabled={shopifyCheckoutQuery.isCartEmpty}
			onClick={() =>
				!checkoutUrl ? null : window.location.replace(checkoutUrl)
			}
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

const Container = styled.button<{ disabled: boolean }>`
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
