import React, { ReactElement, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { sortBy } from "lodash"
// import types
import { ProductsQuery_I } from "../../@types/query"
// import styles
import {
	CategoryButton,
	CategoryNav,
	ContentBody,
	ContentHeader,
} from "../../styles/elements"

// ************
// types
// ************

export interface ProductCategories_I {
	categories: ProductsQuery_I["data"]["allCollections_datocms"]
	category_selected: ProductsQuery_I["data"]["collection_datocms"]
}

// ************
// component
// ************

export default function ProductsHeader({
	categories,
	category_selected,
}: ProductCategories_I): ReactElement {
	// toggle button text
	const [expand, expand_set] = useState<boolean>(false)

	const categoriesSorted = sortBy(categories.nodes, "displayName")
	const categoryArray: ReactElement[] = categoriesSorted
		.filter((category) => category.noNavDisplay === false)
		.map((category, categoryIndex) => {
			// set all titles to lowercase for compare and sort
			category.title = category.title?.toLowerCase()

			// DISPLAY category button
			return (
				// TODO: will need to modify filter when mobile nav is created
				<Link to={`/products/${category.slug}`} key={categoryIndex}>
					<StyledButton
						key={categoryIndex}
						className={
							category.slug === category_selected.slug ? "active" : ""
						}
					>
						{/* change button display from 'tea' to 'all' */}
						{category.title === "tea" ? "all" : category.title}
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
					<h3>{category_selected.displayName}</h3>
					{category_selected.subtitle && (
						<h5>{category_selected.subtitle}</h5>
					)}
				</Header>
				{category_selected.description && (
					<>
						<Body
							expand={expand}
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(category_selected.description),
							}}
						/>
						<Expand onClick={() => expand_set(!expand)}>
							{expand === true ? "show less" : "show more"}
						</Expand>
					</>
				)}
			</SelectedCategory>
		</>
	)
}

// ************
// styles
// ************

const Body = styled(ContentBody)<{ expand: boolean }>`
	max-height: ${(props) => (props.expand === false ? "9em" : "100%")};
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: height 0.2s;

	/* allows body to collapse with ellipsis at line break */
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${(props) => (props.expand === false ? 6 : null)};

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
const SelectedCategory = styled.div`
	margin: 48px 0;
`
const StyledButton = styled(CategoryButton)`
	&:hover {
		background: hsla(${({ theme }) => theme.appGreenPartial}, 0.5);
		border: 1px solid ${({ theme }) => theme.appGreen};
		color: white;
		cursor: pointer;
	}
	&.active {
		background: none;
		border: 1px solid white;
		color: white;
	}
`
