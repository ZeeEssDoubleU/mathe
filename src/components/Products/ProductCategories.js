import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
// import styles
import {
  CategoryButton,
  CategoryNav,
  ContentBody,
  ContentHeader,
} from "../../styles/elements"
// import store
import { useStore } from "../../store/useStore"

const ProductsHeader = props => {
  const { state } = useStore()
  // toggle button text
  const [expand, expand_set] = useState(false)

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
                category.title === state?.activeCategory ? "active" : ""
              }
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
    return (
      state?.activeCategory?.toLowerCase() === category.title?.toLowerCase()
    )
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
          expand={expand}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(activeCategoryDescription),
          }}
        />
        <Expand onClick={() => expand_set(!expand)}>
          {expand === true ? "show less" : "show more"}
        </Expand>
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
const Body = styled(ContentBody)`
  max-height: ${props => (props.expand === false ? "9em" : "100%")};
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: height 0.2s;

  /* allows body to collapse with ellipsis at line break */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => (props.expand === false ? 6 : null)};

  p {
    margin-bottom: 1.5em;
  }
  p:last-child {
    margin-bottom: 0;
  }
`
const Expand = styled(CategoryButton)`
  margin: 18px 0 0 0;
  padding: 0;
  font-size: 12px;
`
const Header = styled(ContentHeader)`
  text-align: left;
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
