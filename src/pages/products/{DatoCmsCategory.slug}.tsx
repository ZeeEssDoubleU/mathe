import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImageFluidProps } from "gatsby-image"
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
        <ProductCategories categories={categories} /> // all categories
      </Section>
      <Divider />
      <Section>
        <ProductListings products={products} /> // all products
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
  }
`
