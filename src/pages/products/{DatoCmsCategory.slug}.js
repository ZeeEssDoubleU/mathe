import React, { useLayoutEffect } from "react"
import { graphql } from "gatsby"
// import components
import ProductCategories from "../../components/Products/ProductCategories"
import ProductListings from "../../components/Products/ProductListings"
import Main from "../../components/Layout/Main"
// import styles
import { Divider, Section } from "../../styles/elements"
import { setActiveCategory } from "../../store/useStore"
// import store
import { useStore } from "../../store/useStore"

// ************
// component
// ************

const Products = ({ path, data }) => {
  const { dispatch } = useStore()
  const { page, categories, products } = data

  // TODO: fix to make setActiveCategory change before page loads
  useLayoutEffect(() => {
    setActiveCategory(
      dispatch,
      categories.edges.filter(category => path.includes(category.node.slug))[0]
        .node.title
    )
  }, [])

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
