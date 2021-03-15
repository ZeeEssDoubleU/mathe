import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { Products_I } from "../../@types/query"
// import styles
import { CategoryButton, CategoryNav } from "../../styles/elements"
// import store
import { useStore, setActiveCategory } from "../../store/useStore"
// import utils
import { convertGrams } from "../../utils/convertGrams"

// ************
// component
// ************

// TODO: figure out how to use parameter aliases
export default function ProductsBody({ products }: Products_I): ReactElement {
	const { state, dispatch } = useStore()

	const productArray: ReactElement[] = products.nodes
		// filter array on products that only match activeCategory
		.filter((product) => {
			const categories = product.categories
			const categoryMap: string[] = categories.map((category) =>
				category.title.toLowerCase(),
			)

			// filter on active category
			return (
				product.active === true &&
				categoryMap.includes(state.activeCategory)
			)
		})
		// sort array alphabetically
		.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
		.map((product, productIndex) => {
			// turn categories into a tag map to be displayed with products
			const tagArray = product.categories

			const tagMap: ReactElement[] = tagArray.map((tag, tagIndex) => {
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
					<HeaderBlock>
						<TitleBlock>
							<Title>{product.title}</Title>
							{product.subtitle && (
								<SubTitle>{product.subtitle}</SubTitle>
							)}
						</TitleBlock>
						<BuyBlock>
							<Price>
								${product.price.toFixed(2)} / {product.weight.amount}{" "}
								{product.weight.units}
							</Price>
							<BuyButton
								className="snipcart-add-item"
								// required
								data-item-id={`${product.slug}`}
								data-item-price={product.price}
								data-item-url={`/products/${product.categories[0].slug}`}
								// optional
								data-item-name={product.title}
								data-item-description={product.description}
								// TODO: make sure this works
								data-item-size={`${product.weight.amount} ${product.weight.units}`}
								data-item-weight={convertGrams(
									product.weight.amount,
									product.weight.units,
								)}
							>
								Add to Cart
							</BuyButton>
						</BuyBlock>
					</HeaderBlock>
					<Description
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(product.description),
						}}
					/>
					<Tags>{tagMap}</Tags>
				</Listing>
			)
		})

	// DISPLAY products
	return (
		<>
			<ProductCount>
				Displaying <span className="count">{productArray.length}</span>{" "}
				products
			</ProductCount>
			{productArray}
		</>
	)
}

// ************
// styles
// ************

const BuyBlock = styled.div`
	display: grid;
	justify-content: space-between;
	align-items: center;
	grid-template-columns: auto auto;
	margin: 12px 0;
`
const BuyButton = styled(CategoryButton)`
	border: 1px solid ${({ theme }) => theme.appGreen};
	color: white;
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
const Description = styled.p`
	margin-bottom: 12px;
`
const HeaderBlock = styled.div`
	display: grid;
	grid-template-rows: auto auto;
`
const Listing = styled.div`
	margin: 64px 0;
`
const Price = styled.p`
	/* color: ${({ theme }) => theme.appGreen}; */
	font-size: 14px;
	font-weight: 500;
`
const ProductCount = styled.p`
	margin: 48px 0;
	.count {
		font-weight: 500;
		color: ${({ theme }) => theme.appGreen};
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
const TitleBlock = styled.div``
const Title = styled.h4`
	font-size: 20px;
	font-weight: 300;
	text-transform: uppercase;
`
