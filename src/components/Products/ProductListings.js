import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// import styles
import { CategoryButton, CategoryNav } from "../../styles/elements"
// import store
import { useStore, setActiveCategory } from "../../store/useStore"

const ProductsBody = props => {
  const { state, dispatch } = useStore()

  const productArray = props.allProducts.edges
    // filter array on products that only match activeCategory
    .filter(edge => {
      const product = edge.node
      const categories = product.categories
      const categoryMap = categories.map(category =>
        category.title.toLowerCase()
      )

      // filter on active category
      return categoryMap.includes(state.activeCategory)
    })
    // sort array alphabetically
    .sort((a, b) => {
      if (a.node.title < b.node.title) return -1
      if (a.node.title > b.node.title) return 1
      return 0
    })
    .map((edge, productIndex) => {
      const product = edge.node
      // turn categories into a tag map to be displayed with products
      const tagArray = product.categories
      const tagMap = tagArray.map((tag, tagIndex) => {
        tag.title = tag.title.toLowerCase()

        // DISPLAY category tags for each product
        return (
          <Link to={`/products/${tag.slug}`} key={tagIndex}>
            <StyledButton
              key={tagIndex}
              onClick={() => {
                // set active category when tag clicked
                setActiveCategory(dispatch, tag.title)
              }}
            >
              {tag.title}
            </StyledButton>
          </Link>
        )
      })

      // DISPLAY each product
      return (
        <Listing key={productIndex}>
          <TitleBlock>
            <Title>{product.title}</Title>
            {product.subtitle && <SubTitle>{product.subtitle}</SubTitle>}
          </TitleBlock>
          <Description>{product.description}</Description>
          <Tags>{tagMap}</Tags>
        </Listing>
      )
    })

  // DISPLAY products
  return (
    <>
      <ProductCount>
        Displaying <span className="count">{productArray.length}</span> products
      </ProductCount>
      {productArray}
    </>
  )
}
ProductsBody.propType = {}
export default ProductsBody

// ************
// styles
// ************

const Description = styled.p`
  margin-bottom: 12px;
`
const Listing = styled.div`
  margin: 64px 0;
`
const ProductCount = styled.p`
  margin: 48px 0;
  .count {
    font-weight: 500;
    color: ${props => props.theme.appGreen};
  }
`
const SubTitle = styled.h5`
  font-size: 14px;
  font-style: italic;
  font-weight: 300;
`
const StyledButton = styled(CategoryButton)`
  font-size: 12px;
  margin: 0 18px 0 0;
  padding: 0;
  border: none;
`
const Tags = styled(CategoryNav)`
  justify-content: flex-start;
`
const TitleBlock = styled.div`
  margin-bottom: 12px;
`
const Title = styled.h4`
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
`
