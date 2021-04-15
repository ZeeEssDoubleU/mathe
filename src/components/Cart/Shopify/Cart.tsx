import React, { useEffect, ReactElement, useRef } from "react"
import styled from "styled-components"
// import components
import CartHeader from "./CartHeader"
import CartFooter from "./CartFooter"
import Item from "./CartItem"
import { useClickOutside } from "../../../hooks"
// import store
import {
	useCheckout,
	useCheckoutMutation,
	usePersistCheckout,
} from "../../../api/shopify"
import { useShopify } from "../../../store"

// ************
// component
// ************

export default function Cart(): ReactElement {
	const cartRef = useRef(null)
	useClickOutside(cartRef)
	const shopifyState = useShopify()
	const shopifyCheckoutQuery = useCheckout()
	const shopifyCheckoutMutation = useCheckoutMutation()
	const persistCheckout = usePersistCheckout()

	// create shopify checkout when cart mounts
	useEffect(() => {
		const checkoutId = persistCheckout.get()
		if (!checkoutId) {
			shopifyCheckoutMutation.createCheckout.mutate({})
		} else {
			shopifyState.setCheckoutId(checkoutId)
		}
	}, [])

	const lineItems = shopifyCheckoutQuery.isCartEmpty ? (
		<div className="empty">Your cart is empty.</div>
	) : (
		shopifyCheckoutQuery.lineItems?.edges.map((edge) => {
			const item = edge.node

			return item.variant ? (
				<Item
					key={item.id}
					id={item.id}
					title={item.title}
					quantity={item.quantity}
					price={item.variant.priceV2.amount}
				/>
			) : null
		})
	)

	return (
		<Container ref={cartRef} isOpen={shopifyState.isCartOpen}>
			<CartHeader />
			{/* display line items */}
			<Main>{lineItems}</Main>
			<CartFooter />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div<{ isOpen: boolean }>`
	display: grid;
	grid-template-rows: auto 1fr auto;

	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	z-index: ${({ theme }) => theme.zIndex.top};

	background: white;
	color: ${({ theme }) => theme.color.font_dark};

	transform: translateX(${(props) => (props.isOpen === true ? 0 : "100%")});
	transition: transform 0.3s ease;

	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		width: 35%;
	}
`
const Main = styled.main`
	.empty {
		padding: ${({ theme }) => theme.spacing.cart_padding};
	}
`
