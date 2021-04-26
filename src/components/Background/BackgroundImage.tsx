import React, { ReactElement, useEffect, useState } from "react"
import styled, { useTheme } from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
// import store / types
import { useCategory } from "../../redux"
import { BackgroundImageFragment } from "../../graphql/types"

// ************
// types
// ************

export interface BackgroundImage_I {
	bgIndex: string
	imageData: BackgroundImageFragment
}

// ************
// component
// ************

export default function BackgroundImage({
	bgIndex,
	imageData,
}: BackgroundImage_I): ReactElement {
	const { duration } = useTheme()
	const { backgroundQueue } = useCategory()
	// component state
	const [hidden, setHidden] = useState<boolean>(true)
	const [imageLoaded, setImageLoaded] = useState<boolean>(false)
	const showBg = backgroundQueue[0] === bgIndex

	// effect sets hidden state, which sets hidden attribute
	useEffect(() => {
		setTimeout(() => setHidden(!showBg), hidden ? 0 : duration.bg_fade)
	}, [showBg])

	return (
		<FadeAnim
			title={imageData.title}
			show={showBg}
			data-bgIndex={bgIndex}
			data-hidden={hidden}
		>
			<Container
				title={imageData.title}
				data-bgIndex={bgIndex}
				hidden={hidden}
			>
				<Image
					title={imageData.title}
					alt={imageData.alt}
					image={imageData.gatsbyImageData}
					onLoad={() => setImageLoaded(true)}
					imageLoaded={String(imageLoaded)}
					loading={showBg ? "eager" : "lazy"}
					hidden={hidden}
				/>
			</Container>
		</FadeAnim>
	)
}

// ************
// styles
// ************

const FadeAnim = styled.div<{ show: boolean }>`
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
	opacity: ${(props) => (props.show ? 1 : 0)};
	transition: ${({ theme: { duration } }) =>
		`opacity ${duration.bg_fade}ms, visibility ${duration.bg_fade}ms`};
`
const Container = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: ${({ theme }) => theme.zIndex.bottom};
`
const Image = styled(GatsbyImage)<{ imageLoaded: string }>`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	// only fade in once image loaded
	visibility: ${(props) => (props.imageLoaded ? "visible" : "hidden")};
	opacity: ${(props) => (props.imageLoaded === "true" ? 1 : 0)};
	transition: ${({ theme: { duration } }) =>
		`opacity ${duration.bg_fade}ms, visibility ${duration.bg_fade}ms`};
`
