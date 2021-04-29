import { useStaticQuery, graphql } from "gatsby"
import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Icon from "../../Icon"
// import types
import { GetPaymentSettingsQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function AcceptedPayments(): ReactElement {
	const { shop }: GetPaymentSettingsQuery = useStaticQuery(query)
	const { acceptedCardBrands, supportedDigitalWallets } = shop.paymentSettings

	const createIcon = (element: string) => {
		const name = element.toLowerCase()
		return <Icon name={name} key={name} />
	}
	const cardMap = acceptedCardBrands.map((card) => createIcon(card))
	const walletMap = supportedDigitalWallets.map((wallet) => createIcon(wallet))

	return (
		<Container>
			{cardMap}
			{walletMap}
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: -2px 0 0 -2px;

	svg {
		height: 1.5rem;
		border: 1px solid #c9cccf;
		border-radius: 4px;
		margin: 2px 0 0 2px;
	}
`

// ************
// query
// ************

const query = graphql`
	query getPaymentSettings {
		shop: shopifyShop {
			paymentSettings {
				acceptedCardBrands
				supportedDigitalWallets
			}
		}
	}
`
