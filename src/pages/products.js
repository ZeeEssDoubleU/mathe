import React from "react";
import { useStaticQuery, graphql } from "gatsby";
// import components
import ProductCategories from "../components/Products/ProductCategories";
import ProductListings from "../components/Products/ProductListings";
import Main from "../components/Layout/Main";
// import styles
import { Divider, Section } from "../styles/elements";

// ************
// component
// ************

const Products = () => {
	const { page, categories, subCategories, products } = useStaticQuery(query);

	const contentSection = (
		<>
			<Section>
				<ProductCategories
					categories={categories}
					subCategories={subCategories}
				/>
			</Section>
			<Divider />
			<Section>
				<ProductListings allProducts={products} />
			</Section>
		</>
	);

	return (
		<Main
			heroHeader={page.header}
			heroSubheader={page.subHeader}
			medallion={page.medallion}
			content={contentSection}
		/>
	);
};
Products.propTypes = {};
export default Products;

// TODO: figure out why medallion's aren't coming through on netlify
// *** QUERY ***
const query = graphql`
	{
		page: datoCmsProductsPage {
			header
			subHeader
			medallion {
				url
			}
		}
		categories: allDatoCmsCategory {
			edges {
				node {
					title
					subTitle
					displayName
					description
					image {
						title
						alt
						fluid(maxWidth: 1400, imgixParams: { fm: "jpg" }) {
							...GatsbyDatoCmsFluid
						}
					}
				}
			}
		}
		subCategories: allDatoCmsSubCategory {
			edges {
				node {
					title
					subTitle
					displayName
					description
					image {
						title
						alt
						fluid(maxWidth: 1400, imgixParams: { fm: "jpg" }) {
							...GatsbyDatoCmsFluid
						}
					}
				}
			}
		}
		products: allDatoCmsProduct {
			edges {
				node {
					title
					subtitle
					description
					grade {
						title
						description
					}
					categories {
						title
					}
					subCategories {
						title
					}
					# image {
					# 	title
					# 	alt
					# 	fluid(maxWidth: 1400) {
					# 		...GatsbyDatoCmsFluid
					# 	}
					# }
					# ingredients
				}
			}
		}
	}
`;
