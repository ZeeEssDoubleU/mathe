import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import { ProductsQuery_I } from "../@types/query"
// import components
import ProductCategories from "../components/Products/ProductCategories"
import ProductListings from "../components/Products/ProductListings"
import Main from "../components/Layout/Main"
// import styles
import { Divider, Section } from "../styles/elements"

// ************
// component
// ************

export default function Products({ data }: ProductsQuery_I): ReactElement {
	const {
		page,
		allCollections_datocms,
		collection_datocms,
		collection_shopify,
		products_datocms,
	} = data

	const contentSection = (
		<>
			<Section>
				{/* all categories */}
				<ProductCategories
					categories={allCollections_datocms}
					category_selected={collection_datocms}
				/>
			</Section>
			<Divider />
			<Section>
				{/* all products */}
				<ProductListings
					categories={allCollections_datocms}
					category_selected={{
						products_datocms,
						collection_shopify,
					}}
				/>
			</Section>
		</>
	)

	return (
		<Main
			heroHeader={page.header}
			heroSubheader={page.subHeader}
			medallion={page.medallion}
		>
			{contentSection}
		</Main>
	)
}

// ************
// query
// ************

export const query = graphql`
	query($collection_slug: String!, $collection_product_slugs: [String]) {
		page: datoCmsPage(title: { eq: "Products" }) {
			header
			subHeader
			medallion {
				url
			}
		}
		# all collections
		allCollections_datocms: allDatoCmsCategory {
			nodes {
				slug
				title
				navDisplay
				tagDisplay
				description
				noNavDisplay
			}
		}
		# selected collection (filter on slug)
		collection_datocms: datoCmsCategory(slug: { eq: $collection_slug }) {
			slug
			title
			subtitle
			navDisplay
			tagDisplay
			description
		}
		collection_shopify: shopifyCollection(handle: { eq: $collection_slug }) {
			handle
			products {
				handle
				title
				descriptionHtml
				productType
				tags
				availableForSale
				variants {
					shopifyId
					weight
					weightUnit
					priceNumber
				}
			}
		}
		# selected products (filter on array of slugs)
		products_datocms: allDatoCmsProduct(
			filter: { slug: { in: $collection_product_slugs } }
		) {
			nodes {
				slug
				title
				subtitle
				description
			}
		}
	}
`
