import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { intersectionBy } from "lodash"
// import components
import Header from "./ListingHeader"
// import types
import {
	ShopifyProductFragment,
	ProductCollectionBySlugQuery,
} from "../../../graphql/types"
// import styles
import { CategoryButton, CategoryNav } from "../../../styles/elements"

// ************
// types
// ************

export interface ProductListingI {
	categories: ProductCollectionBySlugQuery["allCollections_datocms"]
	products_datocms: ProductCollectionBySlugQuery["products_datocms"]
	product_shopify: ShopifyProductFragment
}

// ************
// component
// ************

export default function ProductListing({
	categories,
	products_datocms,
	product_shopify,
}: ProductListingI): ReactElement {
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

	// DISPLAY each product
	return (
		<Listing>
			<Header
				handle={product_shopify.handle}
				title={product_title}
				subtitle={product_datocms?.subtitle}
				variant={product_shopify.variants[0]}
			/>
			<Description
				dangerouslySetInnerHTML={{
					__html: sanitizeHtml(product_description),
				}}
			/>
			<Tags>{tagMap}</Tags>
		</Listing>
	)
}

// ************
// styles
// ************

const Description = styled.p`
	margin-bottom: 12px;
`
const Listing = styled.div`
	margin: 64px 0;
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
