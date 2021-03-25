import React, { useEffect, ReactElement } from "react"
import styled from "styled-components"
// import components
import CartHeader from "./CartHeader"
import CartFooter from "./CartFooter"
import Item from "./CartItem"
// import store
import { useShopify } from "../../../store"

// ************
// component
// ************

export default function Cart(): ReactElement {
	const state_shopify = useShopify()

	// create shopify checkout when cart mounts
	useEffect(() => {
		state_shopify.createCheckout()
	}, [])

	useEffect(() => {
		console.log("thing", state_shopify.lineItems)
	}, [state_shopify.lineItems])

	// map cart line items
	const lineItems = state_shopify.isCartEmpty ? (
		<div className="empty">Your cart is empty.</div>
	) : (
		state_shopify.lineItems?.map((item) => {
			return (
				<Item
					key={item.id}
					id={item.id}
					title={item.title}
					quantity={item.quantity}
					price={item.variant.price}
				/>
			)
		})
	)

	return (
		<Container isOpen={state_shopify.isCartOpen}>
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
	right: ${(props) => (props.isOpen === true ? 0 : "-100%")};
	width: 100%;
	height: 100%;
	overflow-y: scroll;

	background: white;
	color: ${({ theme }) => theme.color.font_dark};

	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		right: ${(props) => (props.isOpen === true ? 0 : "-35%")};
		width: 35%;
	}
`
const Main = styled.main`
	.empty {
		padding: ${({ theme }) => theme.spacing.cart_padding};
	}
`
