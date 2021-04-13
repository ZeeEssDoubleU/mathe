import React, { ReactElement } from "react"
import styled from "styled-components"
// import types
import {
	DatoCmsCategoryFragment,
	ShopifyProductFragment,
	ShopifyProductVariantFragment,
} from "../../../graphql/types"
// import styles
import { CategoryButton } from "../../../styles/elements"
// import store / queries / utils
import { useShopify } from "../../../store"
import { abbreviate } from "../../../utils"
import { useCheckoutMutation } from "../../../store/shopifySlice/hooks"

// ************
// types
// ************

export interface ProductListingHeaderI {
	handle: ShopifyProductFragment["handle"]
	title: ShopifyProductFragment["title"]
	subtitle?: DatoCmsCategoryFragment["subtitle"]
	variant: ShopifyProductVariantFragment
}

// ************
// component
// ************

export default function ProductListingHeader({
	handle,
	title,
	subtitle,
	variant,
}: ProductListingHeaderI): ReactElement {
	const shopifyState = useShopify()
	const shopifyCheckoutMutation = useCheckoutMutation()
	// const { getInventoryByHandle } = useShopify()

	// add line item to cart
	function addLineItem() {
		const checkoutId = shopifyState.checkoutId
		const variantId = variant.shopifyId
		const lineItemsToAdd = [{ variantId, quantity: 1 }]

		if (checkoutId) {
			shopifyCheckoutMutation.addLineItem.mutate({
				checkoutId,
				lineItems: lineItemsToAdd,
			})
		}
	}

	// product display info
	const { priceNumber, weight, weightUnit, quantityAvailable } = variant
	// const quantityAvailable = getInventoryByHandle(handle)
	const inStock = quantityAvailable > 0

	// TODO: change readyToSell to true when products are ready to sell
	const readyToSell = false
	function displayButtonText() {
		if (!readyToSell) {
			return "Coming Soon"
		} else if (!inStock) {
			return "Out of Stock"
		} else {
			return "Add to Cart"
		}
	}

	// DISPLAY each product
	return (
		<HeaderBlock>
			<TitleBlock>
				<Title>{title}</Title>
				{subtitle && <SubTitle>{subtitle}</SubTitle>}
			</TitleBlock>
			<BuyBlock>
				<Price>
					${priceNumber.toFixed(2)} / {weight} {abbreviate(weightUnit)}
				</Price>
				<BuyButton disabled={!inStock} onClick={addLineItem}>
					{displayButtonText()}
				</BuyButton>
			</BuyBlock>
		</HeaderBlock>
	)
}

// ************
// styles
// ************

const BuyBlock = styled.div`
	display: grid;
	justify-content: space-between;
	align-items: center;
	grid-template-columns: auto auto;
	margin: 12px 0;
`
const BuyButton = styled(CategoryButton)<{ disabled: boolean }>`
	border: 1px solid ${({ theme }) => theme.color.app_green};
	color: ${(props) => (props.disabled ? props.theme.color.disabled : "white")};

	&:hover {
		background: ${(props) =>
			props.disabled ? null : props.theme.color.hover_bg};
		color: white;
		cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
	}
	&.active {
		background: none;
		border: 1px solid white;
	}
`
const HeaderBlock = styled.div`
	display: grid;
	grid-template-rows: auto auto;
`
const Price = styled.p`
	/* color: ${({ theme }) => theme.color.app_green}; */
	font-size: 14px;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
const SubTitle = styled.h5`
	font-size: 14px;
	font-style: italic;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
`
const TitleBlock = styled.div``
const Title = styled.h4`
	font-size: 20px;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
	text-transform: uppercase;
`
