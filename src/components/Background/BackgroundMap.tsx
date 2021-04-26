import React, { ReactElement, useEffect } from "react"
import styled from "styled-components"
// import component
import BackgroundImage from "./BackgroundImage"
// import store / types
import { useCategory } from "../../redux"
import { BackgroundComponentQuery } from "../../graphql/types"

// ************
// types
// ************

export interface BackgroundMap_I {
	categories: BackgroundComponentQuery["allCategories_datocms"]["nodes"]
}

// ************
// component
// ************

export default function BackgroundMap({
	categories,
}: BackgroundMap_I): ReactElement {
	const {
		selectedCategory,
		selectedBackground,
		backgroundIndex,
		setBackgroundQueue,
	} = useCategory()

	useEffect(() => {
		if (selectedBackground) {
			setBackgroundQueue(`${selectedCategory}-${backgroundIndex}`)
		}
	}, [selectedBackground])

	const displayBackgrounds: ReactElement[][] = categories.map(
		(category): ReactElement[] =>
			category.images.imageGallery.map(
				(img, index): ReactElement => {
					const bgIndex = `${category.slug}-${index}`

					return (
						<BackgroundImage
							key={index}
							bgIndex={bgIndex}
							imageData={img}
						/>
					)
				},
			),
	)

	return <Backgrounds>{displayBackgrounds}</Backgrounds>
}

// ************
// component
// ************

const Backgrounds = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`
