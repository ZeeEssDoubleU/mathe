import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import intersectionBy from "lodash/intersectionBy"
import { ProductsQuery_I } from "../../@types/query"
// import styles
import { CategoryButton, CategoryNav } from "../../styles/elements"
// import store
import { useStore, setActiveCategory } from "../../store/useStore"
// import utils
import { convertGrams } from "../../utils/convertGrams"
import { abbreviate } from "../../utils/abbreviate"

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
	const { dispatch } = useStore()
	const { products_datocms, collection_shopify } = category_selected

	const productArray: ReactElement[] = collection_shopify.products
		// sort array alphabetically
		.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
		.map((product_shopify, productIndex) => {
			// turn categories into a relevant tag map to be displayed with products
			const tagArray = product_shopify.tags.map((tag) => ({
				title: tag.toLowerCase(),
			}))
			const categoryArray = categories.nodes.map((category) => ({
				title: category.title.toLowerCase(),
				slug: category.slug,
			}))
			// get intersection of category array and tag array by title prop
			const relevantTags = intersectionBy(categoryArray, tagArray, "title")

			const tagMap: ReactElement[] = relevantTags.map((tag, tagIndex) => {
				// DISPLAY category tags for each product
				return (
					<Link to={`/products/${tag.slug}`} key={tagIndex}>
						<StyledButton
							key={tagIndex}
							onClick={() => {
								// set active category when tag clicked
								setActiveCategory(dispatch, tag.title)
							}}
						>
							{tag.title}
						</StyledButton>
					</Link>
				)
			})

			const product_datocms = products_datocms.nodes.find(
				(product) => product.slug === product_shopify.handle,
			)

			// DISPLAY each product
			return (
				<Listing key={productIndex}>
					<HeaderBlock>
						<TitleBlock>
							<Title>{product_datocms.title}</Title>
							{product_datocms.subtitle && (
								<SubTitle>{product_datocms.subtitle}</SubTitle>
							)}
						</TitleBlock>
						<BuyBlock>
							<Price>
								${product_shopify.variants[0].priceNumber.toFixed(2)} /{" "}
								{product_shopify.variants[0].weight}{" "}
								{abbreviate(product_shopify.variants[0].weightUnit)}
							</Price>
							<BuyButton
								className="snipcart-add-item"
								// required
								data-item-id={`${product_datocms.slug}`}
								data-item-price={
									product_shopify.variants[0].priceNumber
								}
								data-item-url={`/products/${collection_shopify.handle}`}
								// optional
								data-item-name={product_datocms.title}
								data-item-description={product_datocms.description}
								// TODO: make sure this works
								data-item-size={`${
									product_shopify.variants[0].weight
								} ${abbreviate(
									product_shopify.variants[0].weightUnit,
								)}`}
								data-item-weight={convertGrams(
									product_shopify.variants[0].weight,
									abbreviate(product_shopify.variants[0].weightUnit),
								)}
							>
								Add to Cart
							</BuyButton>
						</BuyBlock>
					</HeaderBlock>
					{product_datocms.description && (
						<Description
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(product_datocms.description),
							}}
						/>
					)}
					<Tags>{tagMap}</Tags>
				</Listing>
			)
		})

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
const BuyButton = styled(CategoryButton)`
	border: 1px solid ${({ theme }) => theme.appGreen};
	color: white;
	&:hover {
		background: hsla(${({ theme }) => theme.appGreenPartial}, 0.5);
		border: 1px solid ${({ theme }) => theme.appGreen};
		color: white;
		cursor: pointer;
	}
	&.active {
		background: none;
		border: 1px solid white;
		color: white;
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
	/* color: ${({ theme }) => theme.appGreen}; */
	font-size: 14px;
	font-weight: 500;
`
const ProductCount = styled.p`
	margin: 48px 0;
	.count {
		font-weight: 500;
		color: ${({ theme }) => theme.appGreen};
	}
`
const SubTitle = styled.h5`
	font-size: 14px;
	font-style: italic;
	font-weight: 300;
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
	font-weight: 300;
	text-transform: uppercase;
`
