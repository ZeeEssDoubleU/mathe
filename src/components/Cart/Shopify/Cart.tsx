import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import CartHeader from "./CartHeader"
import CartFooter from "./CartFooter"
import Item from "./CartItem"

// ************
// component
// ************

export default function Cart(): ReactElement {
	return (
		<Container>
			<CartHeader />
			<Main>
				<Item />
				<Item />
			</Main>
			<CartFooter />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;

	position: fixed;
	height: 100%;
	width: 35%;
	top: 0;
	right: 0;

	background: white;
	color: ${({ theme }) => theme.color.font_dark};
`
const Main = styled.main``
