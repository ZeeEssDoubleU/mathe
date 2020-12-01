import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import dompurify from "dompurify"
// import styles
import {
  CategoryButton,
  CategoryNav,
  ContentBody,
  ContentHeader,
} from "../../styles/elements"
// import store
import { useStore, setActiveCategory } from "../../store/useStore"

const ProductsHeader = props => {
  const { state, dispatch } = useStore()

  // category array for filtering products
  const categoryArray = props.categories.edges
    .map((edge, categoryIndex) => {
      const category = edge.node
      // set all titles to lowercase for compare and sort
      category.title = category.title?.toLowerCase()

      // TODO: will need to modify filter when mobile nav is created
      const hide = ["tea blend", "traditionally scented", "decaf", "flavored"]
      const show = !hide.includes(category.title)

      // DISPLAY category button
      return (
        // TODO: will need to modify filter when mobile nav is created
        show && (
          <Link to={`/products/${category.slug}`} key={categoryIndex}>
            <StyledButton
              key={categoryIndex}
              className={
                category.title === state.activeCategory ? "active" : ""
              }
              // set active category when category clicked
              onClick={() => {
                setActiveCategory(dispatch, category.title)
              }}
            >
              {/* change button display from 'tea' to 'all' */}
              {category.title === "tea" ? "all" : category.title}
            </StyledButton>
          </Link>
        )
      )
    })
    // TODO: will need to modify filter when mobile nav is created
    .filter(elem => elem !== false)
    // sort array alphabetically
    .sort((a, b) => {
      if (a.props.children.props.children < b.props.children.props.children)
        return -1
      if (a.props.children.props.children > b.props.children.props.children)
        return 1
      return 0
    })

  // category filters
  const categoryFilter = props.categories.edges.filter(edge => {
    const category = edge.node
    return state.activeCategory?.toLowerCase() === category.title?.toLowerCase()
  })
  const categoryDisplayName = categoryFilter.map(edge => {
    const category = edge.node
    return category.displayName
  })
  const categorySubTitle = categoryFilter.map(edge => {
    const category = edge.node
    return category.subTitle
  })
  const categoryDescription = categoryFilter.map(edge => {
    const category = edge.node
    return category.description
  })

  // active category filters
  const activeCategoryDisplay =
    categoryDisplayName.length !== 0 && categoryDisplayName
  const activeCategorySubTitle =
    categorySubTitle.length !== 0 && categorySubTitle
  const activeCategoryDescription =
    categoryDescription.length !== 0 && categoryDescription

  // DISPLAY category buttons (plural)
  return (
    <>
      <CategoryNav>{categoryArray}</CategoryNav>
      <ActiveCategory>
        <Header>
          <h3>{activeCategoryDisplay}</h3>
          <h5>{activeCategorySubTitle}</h5>
        </Header>
        <Body
          dangerouslySetInnerHTML={{
            // TODO: Figure out why dompurify not working with netlify
            // __html: dompurify.sanitize(activeCategoryDescription),
            __html: activeCategoryDescription,
          }}
        />
      </ActiveCategory>
    </>
  )
}
ProductsHeader.propType = {}
export default ProductsHeader

// ************
// styles
// ************

const ActiveCategory = styled.div`
  margin: 48px 0;
`
const Header = styled(ContentHeader)`
  text-align: left;
`
const Body = styled(ContentBody)`
  p {
    margin-bottom: 1.5em;
  }
`
const StyledButton = styled(CategoryButton)`
  &:hover {
    background: hsla(${props => props.theme.appGreenPartial}, 0.5);
    border: 1px solid ${props => props.theme.appGreen};
    color: white;
    cursor: pointer;
  }
  &.active {
    background: none;
    border: 1px solid white;
    color: white;
  }
`
