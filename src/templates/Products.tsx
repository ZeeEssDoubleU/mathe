import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import { ProductCollectionBySlugQuery } from "../graphql/types"
// import components
import ProductCategories from "../components/Products/ProductCategories"
import ProductListings from "../components/Products/ProductListings"
import Main from "../components/Layout/Main"
// import styles
import { Divider, Section } from "../styles/elements"

// ************
// types
// ************

export interface ProductsI {
	data: ProductCollectionBySlugQuery
}

// ************
// component
// ************

export default function Products({ data }: ProductsI): ReactElement {
	const {
		page,
		collection_shopify,
		allCategories_datocms,
		category_datocms,
		products_datocms,
	} = data

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

// ************
// query
// ************

export const query = graphql`
	fragment ShopifyProductVariant on ShopifyProductVariant {
		shopifyId
		weight
		weightUnit
		priceNumber
		quantityAvailable
	}
	fragment ShopifyProduct on ShopifyProduct {
		handle
		title
		descriptionHtml
		productType
		tags
		availableForSale
		totalInventory
		variants {
			...ShopifyProductVariant
		}
	}
	fragment DatoCmsProduct on DatoCmsProduct {
		slug
		title
		subtitle
		description
	}
	fragment DatoCmsCategory on DatoCmsCategory {
		slug
		title
		subtitle
		navDisplay
		tagDisplay
		description
		noNavDisplay
	}

	query ProductCollectionBySlug(
		$collection_slug: String!
		$collection_product_slugs: [String]
	) {
		page: datoCmsPage(title: { eq: "Products" }) {
			title
			header
			subHeader
			medallion {
				url
			}
		}
		# all collections
		allCategories_datocms: allDatoCmsCategory {
			nodes {
				...DatoCmsCategory
			}
		}
		# selected collection (filter on slug)
		collection_shopify: shopifyCollection(handle: { eq: $collection_slug }) {
			handle
			products {
				...ShopifyProduct
			}
		}
		# selected category (filter on slug)
		category_datocms: datoCmsCategory(slug: { eq: $collection_slug }) {
			...DatoCmsCategory
		}
		# selected products (filter on array of slugs)
		products_datocms: allDatoCmsProduct(
			filter: { slug: { in: $collection_product_slugs } }
		) {
			nodes {
				...DatoCmsProduct
			}
		}
	}
`
