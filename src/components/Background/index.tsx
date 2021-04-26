import React, {
	useCallback,
	useLayoutEffect,
	ReactElement,
	useEffect,
} from "react"
import { useStaticQuery, graphql } from "gatsby"
import { random } from "lodash"
// import components
import BackgroundMap from "./BackgroundMap"
// import store
import { useCategory } from "../../redux"
import { BackgroundComponentQuery } from "../../graphql/types"

// ************
// component
// ************

export default function Background(): ReactElement {
	const { allCategories_datocms }: BackgroundComponentQuery = useStaticQuery(
		query,
	)
	const categories = allCategories_datocms.nodes
	const {
		selectedCategory,
		selectedCategoryGallery,
		setBackgroundMap,
		backgroundIndex,
		setBackgroundIndex,
	} = useCategory()

	useLayoutEffect(() => {
		setBackgroundMap(categories)
	}, [])

	// cycle through selected category background images
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

	// effect cycles through category background images
	// effect resets cycle upon changing selectedCategory
	useEffect(() => {
		// if backgroundIndex >= new selectedCategoryGallery.length, reset backgroundIndex
		if (backgroundIndex >= selectedCategoryGallery?.length) {
			cycleBg(selectedCategoryGallery.length)
		}
		// set cycle interval
		const backgroundInterval = setInterval(
			() => cycleBg(selectedCategoryGallery.length),
			8000,
		)

		// clear interval upon changing product category
		return () => clearInterval(backgroundInterval)
	}, [selectedCategory, selectedCategoryGallery, backgroundIndex, cycleBg])

	return <BackgroundMap categories={categories} />
}

// ************
// query
// ************

const query = graphql`
	fragment BackgroundImage on DatoCmsFileField {
		alt
		title
		gatsbyImageData(
			layout: FULL_WIDTH
			imgixParams: { auto: "format, compress", maxW: 2560 }
		)
	}
	fragment BackgroundCategory on DatoCmsCategory {
		slug
		title
		images {
			imageGallery {
				...BackgroundImage
			}
		}
	}
	query BackgroundComponent {
		allCategories_datocms: allDatoCmsCategory {
			nodes {
				...BackgroundCategory
			}
		}
	}
`
