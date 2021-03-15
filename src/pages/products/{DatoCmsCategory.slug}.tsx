import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Page_I, Categories_I, Products_I } from "../../@types/query"
// import components
import ProductCategories from "../../components/Products/ProductCategories"
import ProductListings from "../../components/Products/ProductListings"
import Main from "../../components/Layout/Main"
// import styles
import { Divider, Section } from "../../styles/elements"

// ************
// types
// ************

export interface ProductsQuery_I extends Page_I, Categories_I, Products_I {}

// ************
// component
// ************

export default function Products(): ReactElement {
	const { page, categories, products }: ProductsQuery_I = useStaticQuery(query)

	const contentSection = (
		<>
			<Section>
				{/* all categories */}
				<ProductCategories categories={categories} />
			</Section>
			<Divider />
			<Section>
				{/* all products */}
				<ProductListings products={products} />
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
	{
		page: datoCmsProductsPage {
			header
			subHeader
			medallion {
				url
			}
		}
		categories: allDatoCmsCategory {
			nodes {
				title
				subTitle
				displayName
				description
				noNavDisplay
				slug
				images {
					imageGallery {
						title
						alt
						gatsbyImageData(
							layout: FULL_WIDTH
							imgixParams: { auto: "format, compress", maxW: 2560 }
						)
					}
				}
			}
		}

		products: allDatoCmsProduct {
			nodes {
				id
				active
				title
				subtitle
				description
				categories {
					slug
					title
				}
				price
				weight {
					weight
					amount
					units
				}
				slug
			}
		}
	}
`
