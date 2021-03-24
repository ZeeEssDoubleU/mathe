import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"

// ************
// component
// ************

export default function CartHeader(): ReactElement {
	return (
		<Container>
			<h2>Cart Summary</h2>
			<Icon name="plus" />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.header`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;

	min-height: 96px;
	padding: ${({ theme }) => theme.spacing.cart_padding};

	background: ${({ theme }) => theme.color.accent_light};

	h2 {
		font-size: 18px;
	}

	svg {
		height: 30px;
		width: 30px;
		transform: rotate(45deg);
		fill: ${({ theme }) => theme.color.font_dark};
		cursor: pointer;
	}
`
