import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icons/Icon"

// ************
// component
// ************

export default function CartItemHeader(): ReactElement {
	return (
		<Container>
			<Title>Item 1</Title>
			<button className="remove-item">
				<Icon name="trashcan" />
			</button>
		</Container>
	)
}

// ************
// component
// ************

const Container = styled.header`
	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	align-items: center;

	.remove-item {
		display: grid;
		align-items: center;

		padding: 4px;
		border: 1px solid ${({ theme }) => theme.color.accent_light};
		border-radius: 0.25em;

		background: none;
		cursor: pointer;

		svg {
			height: 20px;
			width: 20px;
			fill: red;
		}

		&:hover {
			background: ${({ theme }) => theme.color.accent_light};
		}
	}
`
const Title = styled.h3`
	font-size: 18px;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
