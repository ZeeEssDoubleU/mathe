import React, { ReactElement } from "react"
import styled from "styled-components"
import { sortBy } from "lodash"
// import components
import ProductListing from "./Listing"
// import queries / types
import { ProductCollectionBySlugQuery } from "../../../graphql/types"
import { useInventory } from "../../../api/shopify"

// ************
// types
// ************

export interface ProductListingsI {
	categories: ProductCollectionBySlugQuery["allCollections_datocms"]
	category_selected: {
		products_datocms: ProductCollectionBySlugQuery["products_datocms"]
		collection_shopify: ProductCollectionBySlugQuery["collection_shopify"]
	}
}

// ************
// component
// ************

export default function ProductListings({
	categories,
	category_selected,
}: ProductListingsI): ReactElement {
	const { products_datocms, collection_shopify } = category_selected
	useInventory(collection_shopify.handle)

	const productsSorted = sortBy(collection_shopify.products, "title")
	const productArray: ReactElement[] = productsSorted.map(
		(product_shopify, productIndex) => (
			<ProductListing
				key={productIndex}
				product_shopify={product_shopify}
				categories={categories}
				products_datocms={products_datocms}
			/>
		),
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

const ProductCount = styled.p`
	margin: 48px 0;
	.count {
		font-weight: ${({ theme }) => theme.font.main_weight_heavy};
		color: ${({ theme }) => theme.color.app_green};
	}
`
