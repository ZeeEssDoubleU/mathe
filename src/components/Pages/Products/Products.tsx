import React, { ReactElement } from "react"
// import components
import ProductCategories from "./ProductCategories"
import ProductListings from "./ProductListings"
import Main from "../../Layout/Main"
// import styles
import { Divider, Section } from "../../../styles/elements"
// import types
import { ProductCollectionBySlugQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function Products(
	props: ProductCollectionBySlugQuery,
): ReactElement {
	const {
		page,
		collection_shopify,
		allCategories_datocms,
		category_datocms,
		products_datocms,
	} = props

	return (
		<Main
			heroHeader={page.header}
			heroSubheader={page.subHeader}
			medallion={page.medallion}
		>
			<Section>
				{/* all categories */}
				<ProductCategories
					categories={allCategories_datocms}
					category_selected={category_datocms}
				/>
			</Section>
			<Divider />
			<Section>
				{/* all products */}
				<ProductListings
					categories={allCategories_datocms}
					category_selected={{
						collection_shopify,
						products_datocms,
					}}
				/>
			</Section>
		</Main>
	)
}
