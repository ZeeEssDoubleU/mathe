import React, { ReactElement } from "react"
import styled from "styled-components"
// import types
import {
	DatoCmsCategoryFragment,
	ShopifyProductFragment,
	ShopifyProductVariantFragment,
} from "../../../../graphql/types"
// import styles
import { CategoryButton } from "../../../../styles/elements"
// import store / queries / utils
import { useShopify } from "../../../../redux"
import { abbreviate } from "../../../../utils"
import { useCheckoutMutation } from "../../../../api/shopify"

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
	const { priceNumber, weight, weightUnit } = variant
	const quantityAvailable = shopifyState.getInventoryByHandle(handle)
	const inStock = quantityAvailable > 0

	function displayButtonText() {
		if (!shopifyState.shopReady) {
			return "Coming Soon"
		} else if (!inStock) {
			return "Out of Stock"
		} else {
			return "Add to Cart"
		}
	}

	const isDisabled = !shopifyState.shopReady || !inStock

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
				<AddToCart
					// not using 'disabled' so click tracking remains enabled
					isDisabled={isDisabled}
					data-disabled={isDisabled}
					onClick={(e) => {
						isDisabled ? e.preventDefault() : addLineItem
					}}
					className="add-to-cart"
					data-class="add-to-cart"
					product={handle}
					data-product={handle}
				>
					{displayButtonText()}
				</AddToCart>
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
const AddToCart = styled(CategoryButton)<{
	isDisabled: boolean
	product: string
}>`
	border: 1px solid ${({ theme }) => theme.color.app_green};
	color: ${(props) =>
		props.isDisabled ? props.theme.color.disabled : "white"};

	&:hover {
		background: ${(props) =>
			props.isDisabled ? null : props.theme.color.hover_bg};
		color: white;
		cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
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
