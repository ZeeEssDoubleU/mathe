import React, { ReactElement } from "react"
import styled from "styled-components"

// ************
// component
// ************

export default function Cart(): ReactElement {
	return (
		<Container>
			<Header>
				<Title>Item 1</Title>
				<span>delete</span>
			</Header>
			<Main>
				<Quantity>
					<Less></Less>
					<More></More>
				</Quantity>
				<Price>$5.00</Price>
			</Main>
		</Container>
	)
}

// ************
// component
// ************

const Container = styled.div`
	background: red;
`
const Header = styled.header``
const Less = styled.button``
const Main = styled.main``
const More = styled.button``
const Price = styled.span``
const Quantity = styled.div``
const Title = styled.h2``
