import React, {
	useCallback,
	useState,
	useLayoutEffect,
	ReactElement,
} from "react"
import { useStaticQuery, graphql } from "gatsby"
import { random } from "lodash"
import { IGatsbyImageData } from "gatsby-plugin-image"
// import components
import BackgroundMap from "./BackgroundMap"
// import store
import { useCategory } from "../../redux"

// ************
// types
// ************

export interface BackgroundQuery_I {
	allCategories_datocms: {
		nodes: {
			slug: string
			title: string
			images: {
				imageGallery: {
					alt: string
					title: string
					gatsbyImageData: IGatsbyImageData
				}[]
			}
		}[]
	}
}
export interface Background_I {
	path: string
}

// ************
// component
// ************

export default function Background({ path }: Background_I): ReactElement {
	const { allCategories_datocms }: BackgroundQuery_I = useStaticQuery(query)
	const categories = allCategories_datocms.nodes
	const state_category = useCategory()

	const [categoryIndex, setCategoryIndex] = useState<number>(
		selectedCategoryIndex(),
	)
	const [backgroundIndex, setBackgroundIndex] = useState<number>(0)

	// match selectedCategoryIndex to product image category
	function selectedCategoryIndex(): number {
		return categories.findIndex(
			(category) => category.slug === state_category.selected,
		)
	}

	// cycle through landing background
	const cycleBg = useCallback(
		(selectedGalleryLength: number): void => {
			// pick new random index
			const randomIndex = random(0, selectedGalleryLength)

			// check if new random index equals current index
			const newIndex =
				randomIndex === backgroundIndex
					? // shift background index +1
					  (backgroundIndex + 1) % selectedGalleryLength
					: randomIndex

			setBackgroundIndex(newIndex)
		},
		[backgroundIndex],
	)

	// effect to set background category
	// effect resets cycle upon changing selectedCategory
	useLayoutEffect(() => {
		const storedIndex: number = selectedCategoryIndex()
		const selectedGalleryLength: number =
			categories[storedIndex].images.imageGallery.length

		// set storedIndex on page or selectedCategory change
		setCategoryIndex(storedIndex)

		// set backgroundIndex if greater than or equal to new selectedGalleryLength
		// [x, y, z].length === 3.  Index of 3 does not exist.
		if (backgroundIndex >= selectedGalleryLength) {
			cycleBg(selectedGalleryLength)
		}
		// set cycle interval
		const backgroundInterval = setInterval(
			() => cycleBg(selectedGalleryLength),
			8000,
		)

		// clear interval upon changing product category
		return () => clearInterval(backgroundInterval)
	}, [path, state_category.selected, backgroundIndex, cycleBg, categories])

	return (
		<BackgroundMap
			categories={categories}
			categoryIndex={categoryIndex}
			backgroundIndex={backgroundIndex}
		/>
	)
}

// ************
// query
// ************

const query = graphql`
	query BackgroundComponent {
		allCategories_datocms: allDatoCmsCategory {
			nodes {
				slug
				title
				images {
					imageGallery {
						alt
						title
						gatsbyImageData(
							layout: FULL_WIDTH
							imgixParams: { auto: "format, compress", maxW: 2560 }
						)
					}
				}
			}
		}
	}
`
