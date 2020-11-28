import React from "react"
import { useStaticQuery, graphql } from "gatsby"
// import components
import ProductCategories from "../components/Products/ProductCategories"
import ProductListings from "../components/Products/ProductListings"
import Main from "../components/Layout/Main"
// import styles
import { Divider, Section } from "../styles/elements"

// ************
// component
// ************

// TODO: need to fix Tea Blend filter link

const Products = () => {
  const { page, categories, products } = useStaticQuery(query)

  const contentSection = (
    <>
      <Section>
        <ProductCategories categories={categories} />
      </Section>
      <Divider />
      <Section>
        <ProductListings allProducts={products} />
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
Products.propTypes = {}
export default Products

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
          noNavDisplay
          slug
          images {
            title
            alt
            fluid(imgixParams: { auto: "format, compress", maxW: 2560 }) {
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
          # images {
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
`
