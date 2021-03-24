import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Item from "./Item"

// ************
// component
// ************

export default function Cart(): ReactElement {
	return (
		<Container>
			<Header>
				<h1>Cart Summary</h1>
				<span>What</span>
			</Header>
			<Main>
				<Item />
			</Main>
			<Footer>
				<Subtotal>$10.00</Subtotal>
				<Tax>$1.00</Tax>
				<Total>$11.00</Total>
				<Checkout>Checkout</Checkout>
			</Footer>
		</Container>
	)
}

// ************
// component
// ************

const Checkout = styled.button``
const Container = styled.div`
	position: fixed;
	background: blue;
	height: 100%;
	width: 35%;
	top: 0;
	left: 0;
`
const Footer = styled.footer`
	background: green;
`
const Header = styled.header`
	padding: 0 32px;
	min-height: 96px;
	/* background: yellow; */
`
const Main = styled.main``
const Subtotal = styled.div`
	dislay: grid;
`
const Tax = styled.div`
	dislay: grid;
`
const Total = styled.div`
	dislay: grid;
`
