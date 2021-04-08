import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { intersectionBy, sortBy } from "lodash"
// import types
import { ProductsQuery_I } from "../../@types/query"
// import styles
import { CategoryButton, CategoryNav } from "../../styles/elements"
// import utils
import { abbreviate } from "../../utils"
// import store / queries
import { useShopify } from "../../store"

// ************
// types
// ************

export interface ProductListings_I {
	categories: ProductsQuery_I["data"]["allCollections_datocms"]
	category_selected: {
		products_datocms: ProductsQuery_I["data"]["products_datocms"]
		collection_shopify: ProductsQuery_I["data"]["collection_shopify"]
	}
}

// ************
// component
// ************

export default function ProductsBody({
	categories,
	category_selected,
}: ProductListings_I): ReactElement {
	const shopify = useShopify()

	const { products_datocms, collection_shopify } = category_selected

	const productsSorted = sortBy(collection_shopify.products, "title")
	const productArray: ReactElement[] = productsSorted.map(
		(product_shopify, productIndex) => {
			// turn categories into a relevant tag map to be displayed with products
			const tagArray = product_shopify.tags.map((tag) => ({
				title: tag.toLowerCase(),
			}))
			const categoryArray = categories.nodes.map((category) => ({
				title: category.tagDisplay.toLowerCase(),
				slug: category.slug,
			}))

			// get intersection of category array and tag array by title prop
			const relevantTags: {
				title: string
				slug: string
			}[] = intersectionBy(categoryArray, tagArray, "title")

			const tagMap: ReactElement[] = relevantTags.map((tag, tagIndex) => {
				// DISPLAY category tags for each product
				return (
					<Link to={`/products/${tag.slug}`} key={tagIndex}>
						<StyledButton key={tagIndex}>{tag.title}</StyledButton>
					</Link>
				)
			})

			// get matching product from datocms
			const product_datocms = products_datocms.nodes.find(
				(product) => product.slug === product_shopify.handle,
			)
			// consolidate matched product values
			const product_title = product_datocms?.title || product_shopify.title
			const product_description =
				product_datocms?.description || product_shopify.descriptionHtml

			// add line item to cart
			function addLineItem() {
				const checkoutId = shopify.checkout?.id
				const variantId = product_shopify.variants[0].shopifyId
				const lineItemsToAdd = [{ variantId, quantity: 1 }]

				if (checkoutId) {
					shopify.addLineItem.mutate({
						checkoutId,
						lineItems: lineItemsToAdd,
					})
				}
			}

			// product display info
			const { priceNumber, weight, weightUnit } = product_shopify.variants[0]
			const { availableForSale, quantityAvailable } = product_shopify
			const inStock = quantityAvailable > 0
			function buyButtonText() {
				if (!availableForSale) {
					return "Coming Soon"
				} else if (!inStock) {
					return "Out of Stock"
				} else {
					return "Add to Cart"
				}
			}

			// DISPLAY each product
			return (
				<Listing key={productIndex}>
					<HeaderBlock>
						<TitleBlock>
							<Title>{product_title}</Title>
							{product_datocms?.subtitle && (
								<SubTitle>{product_datocms?.subtitle}</SubTitle>
							)}
						</TitleBlock>
						<BuyBlock>
							<Price>
								${priceNumber.toFixed(2)} / {weight}{" "}
								{abbreviate(weightUnit)}
							</Price>
							<BuyButton
								disabled={!availableForSale || !inStock}
								onClick={addLineItem}
							>
								{buyButtonText()}
							</BuyButton>
						</BuyBlock>
					</HeaderBlock>
					<Description
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(product_description),
						}}
					/>
					<Tags>{tagMap}</Tags>
				</Listing>
			)
		},
	)

	// DISPLAY products
	return (
		<>
			<ProductCount>
				Displaying <span className="count">{productArray.length}</span>{" "}
				products
			</ProductCount>
			{productArray}
		</>
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
const Description = styled.p`
	margin-bottom: 12px;
`
const HeaderBlock = styled.div`
	display: grid;
	grid-template-rows: auto auto;
`
const Listing = styled.div`
	margin: 64px 0;
`
const Price = styled.p`
	/* color: ${({ theme }) => theme.color.app_green}; */
	font-size: 14px;
	font-weight: ${({ theme }) => theme.font.main_weight_heavy};
`
const ProductCount = styled.p`
	margin: 48px 0;
	.count {
		font-weight: ${({ theme }) => theme.font.main_weight_heavy};
		color: ${({ theme }) => theme.color.app_green};
	}
`
const SubTitle = styled.h5`
	font-size: 14px;
	font-style: italic;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
`
const StyledButton = styled(CategoryButton)`
	font-size: 12px;
	margin: 0 18px 0 0;
	padding: 0;
	border: none;
`
const Tags = styled(CategoryNav)`
	justify-content: flex-start;
`
const TitleBlock = styled.div``
const Title = styled.h4`
	font-size: 20px;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
	text-transform: uppercase;
`
