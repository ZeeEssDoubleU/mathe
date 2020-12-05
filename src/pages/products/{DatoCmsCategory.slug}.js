import React from "react"
import { graphql } from "gatsby"
// import components
import ProductCategories from "../../components/Products/ProductCategories"
import ProductListings from "../../components/Products/ProductListings"
import Main from "../../components/Layout/Main"
// import styles
import { Divider, Section } from "../../styles/elements"

// ************
// component
// ************

const Products = ({ data }) => {
  const { page, categories, products } = data

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

// ************
// query
// ************

export const query = graphql`
  query {
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
            imageGallery {
              title
              alt
              fluid(imgixParams: { auto: "format, compress", maxW: 2560 }) {
                ...GatsbyDatoCmsFluid
              }
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
            slug
            title
          }
        }
      }
    }
  }
`
