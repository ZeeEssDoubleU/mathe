import React, { ReactElement, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { Categories_I } from "../../@types/query"
// import styles
import {
	CategoryButton,
	CategoryNav,
	ContentBody,
	ContentHeader,
} from "../../styles/elements"
// import store
import { useStore } from "../../store/useStore"

// ************
// component
// ************

export default function ProductsHeader({
	categories,
}: Categories_I): ReactElement {
	const { state } = useStore()
	// toggle button text
	const [expand, expand_set] = useState<boolean>(false)

	// category array for filtering products
	const categoryArray: ReactElement[] = categories.nodes
		.filter((category) => {
			// set all titles to lowercase for compare and sort
			category.title = category.title?.toLowerCase()

			// TODO: will need to modify filter when mobile nav is created
			const hide = [
				"tea blend",
				"traditionally scented",
				"decaf",
				"flavored",
			]

			// return non-hidden categories
			return !hide.includes(category.title)
		})
		// sort array alphabetically
		.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
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
							category.title === state?.activeCategory ? "active" : ""
						}
					>
						{/* change button display from 'tea' to 'all' */}
						{category.title === "tea" ? "all" : category.title}
					</StyledButton>
				</Link>
			)
		})

	// category filters
	const activeCategoryFilter = categories.nodes.filter(
		(category) =>
			state?.activeCategory?.toLowerCase() === category.title?.toLowerCase(),
	)

	// TODO: need to check activeCategoryFilter optional chaining
	const activeCategoryDisplay: string = activeCategoryFilter[0].displayName
	const activeCategorySubTitle: string = activeCategoryFilter[0].subTitle
	const activeCategoryDescription: string = activeCategoryFilter[0].description

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

// ************
// styles
// ************

const ActiveCategory = styled.div`
	margin: 48px 0;
`
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
