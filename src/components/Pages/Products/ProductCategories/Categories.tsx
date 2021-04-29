import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { sortBy } from "lodash"
// import components
import Description from "./CategoryDescription"
// import types
import { ProductCollectionBySlugQuery } from "../../../../graphql/types/gatsby-generated"
// import styles
import {
	CategoryButton,
	CategoryNav,
	ContentHeader,
} from "../../../../styles/elements"

// ************
// types
// ************

export interface ProductCategoryI {
	categories: ProductCollectionBySlugQuery["allCategories_datocms"]
	category_selected: ProductCollectionBySlugQuery["category_datocms"]
}

// ************
// component
// ************

export default function ProductCategory({
	categories,
	category_selected,
}: ProductCategoryI): ReactElement {
	const categoriesSorted = sortBy(categories.nodes, "navDisplay")
	const categoryArray: ReactElement[] = categoriesSorted
		.filter((category) => category.noNavDisplay === false)
		.map((category, categoryIndex) => {
			// set all titles to lowercase for compare and sort
			category.title = category.title?.toLowerCase()

			// DISPLAY category button
			return (
				<Link to={`/products/${category.slug}`} key={categoryIndex}>
					<StyledButton
						key={categoryIndex}
						className={
							category.slug === category_selected.slug ? "active" : ""
						}
					>
						{category.navDisplay}
					</StyledButton>
				</Link>
			)
		})

	// DISPLAY category buttons (plural)
	return (
		<>
			<CategoryNav>{categoryArray}</CategoryNav>
			<SelectedCategory>
				<Header>
					<h3>{category_selected.title}</h3>
					{category_selected.subtitle && (
						<h4>{category_selected.subtitle}</h4>
					)}
				</Header>
				{category_selected.description && (
					<Description description={category_selected.description} />
				)}
			</SelectedCategory>
		</>
	)
}

// ************
// styles
// ************

const Header = styled(ContentHeader)`
	text-align: left;
`
const SelectedCategory = styled.div`
	margin: 48px 0;
`
const StyledButton = styled(CategoryButton)`
	&:hover {
		background: ${({ theme }) => theme.color.hover_bg};
		border: 1px solid ${({ theme }) => theme.color.app_green};
		color: white;
		cursor: pointer;
	}
	&.active {
		background: none;
		border: 1px solid white;
		color: white;
	}
`
