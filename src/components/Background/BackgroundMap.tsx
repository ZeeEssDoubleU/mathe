import React, { useState, ReactElement } from "react"
import styled from "styled-components"
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image"
// inmport types
import { BackgroundQuery_I } from "./index"

// ************
// types
// ************

export interface BackgroundMap_I {
	categories: BackgroundQuery_I["allCategories_datocms"]["nodes"]
	categoryIndex: number
	backgroundIndex: number
}
export interface Image_I extends GatsbyImageProps {
	initialimageloaded: string
}

// ************
// component
// ************

export default function BackgroundMap({
	categories,
	categoryIndex,
	backgroundIndex,
}: BackgroundMap_I): ReactElement {
	const [initialImageLoaded, setInitialImageLoaded] = useState<boolean>(false)

	// data structure
	// [category] = [img, img, img, ...]
	// [category] = [img, img, img, ...]
	// [category] = [img, img, img, ...]
	const categoryMap = categories.map(
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
											loading={initialImageLoaded ? "lazy" : "eager"}
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

	return <>{categoryMap}</>
}

// ************
// styles
// ************

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
	z-index: ${({ theme }) => theme.zIndex.bottom};
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
