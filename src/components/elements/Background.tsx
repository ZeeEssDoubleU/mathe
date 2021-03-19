import React, {
	useCallback,
	useState,
	useLayoutEffect,
	ReactElement,
} from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { random } from "lodash"
import {
	GatsbyImage,
	GatsbyImageProps,
	IGatsbyImageData,
} from "gatsby-plugin-image"
// import store
import { useStore } from "../../store/useStore"

// ************
// types
// ************

interface BackgroundQuery_I {
	allCollections: {
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
interface Image_I extends GatsbyImageProps {
	initialimageloaded: string
}
interface Background_I {
	path: string
}

// ************
// component
// ************

export default function Background({ path }: Background_I): ReactElement {
	const { allCollections }: BackgroundQuery_I = useStaticQuery(query)
	const categories = allCollections.nodes

	const { state } = useStore()
	const [categoryIndex, setCategoryIndex] = useState<number>(
		selectedCategoryIndex(),
	)
	const [backgroundIndex, setBackgroundIndex] = useState<number>(0)
	const [initialImageLoaded, setInitialImageLoaded] = useState<boolean>(false)

	// match selectedCategoryIndex to product image category
	function selectedCategoryIndex(): number {
		return categories.findIndex(
			(category) => category.slug === state.selectedCategory,
		)
	}

	// data structure
	// [category] = [img, img, img, ...]
	// [category] = [img, img, img, ...]
	// [category] = [img, img, img, ...]
	const backgroundMap: ReactElement[] = categories.map(
		(category, index1): ReactElement => {
			return (
				<ToggleCategory
					key={category.slug}
					className={categoryIndex === index1 ? "active" : ""}
					title={category.slug}
				>
					<Category
						key={category.slug}
						className={categoryIndex === index1 ? "active" : ""}
					>
						{category.images.imageGallery.map((img, index2) => {
							return (
								<ToggleImage
									key={index2}
									className={
										backgroundIndex === index2 ? "active" : ""
									}
									title={img.title}
								>
									<ImageWrapper
										key={index2}
										className={
											backgroundIndex === index2 ? "active" : ""
										}
									>
										<Image
											key={index2}
											title={img.title}
											alt={img.alt}
											image={img.gatsbyImageData}
											onLoad={() => setInitialImageLoaded(true)}
											initialimageloaded={initialImageLoaded.toString()}
										/>
									</ImageWrapper>
								</ToggleImage>
							)
						})}
					</Category>
				</ToggleCategory>
			)
		},
	)

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
	}, [path, state?.selectedCategory, backgroundIndex, cycleBg, categories])

	return <Images>{backgroundMap}</Images>
}

// ************
// styles
// ************

// components listed outside to inside
const Images = styled.div``
const FadeAnim = styled.div<{ className: string }>`
	visibility: ${(props) =>
		props.className === "active" ? "visible" : "hidden"};
	opacity: ${(props) => (props.className === "active" ? 1 : 0)};
	transition: opacity 2000ms, visibility 2000ms;
`
// toggleDisplay moves unused images out of viewport so that they lazyload
// separate component so transition doesn't affect other attributes
const ToggleDisplay = styled.div`
	position: fixed;
	left: 9999px;
	top: 0;
	height: 100%;
	width: 100%;
	/* left transition is delayed on way out and is instant coming back in */
	transition-delay: 2000ms;

	&.active {
		left: 0;
		transition-delay: 0ms;
	}
`
const ToggleCategory = styled(ToggleDisplay)``
const Category = styled(FadeAnim)``
const ToggleImage = styled(ToggleDisplay)`
	position: absolute;
`
const ImageWrapper = styled(FadeAnim)`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: 0;
`
const Image = styled(GatsbyImage)<Image_I>`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	visibility: ${(props) =>
		props.initialimageloaded === "true" ? "visible" : "hidden"};
	opacity: ${(props) => (props.initialimageloaded === "true" ? 1 : 0)};
	transition: opacity 2000ms, visibility 2000ms;
`

// ************
// query
// ************

const query = graphql`
	{
		allCollections: allDatoCmsCategory {
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
