import React, { ReactElement } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
// import components
import NavMenu from "./NavMenu"
import { NavComponentQuery } from "../../graphql/types"

// ************
// component
// ************

export default function Nav(): ReactElement {
	const { logo }: NavComponentQuery = useStaticQuery(query)

	return (
		<Container>
			<h1 className="nav-logo">
				{/* preload image per lighthouse recommendation */}
				<link rel="preload" as="image" href={logo.image.url} />
				<NavLogo
					src={logo.image.url}
					title={logo.image.title}
					alt={logo.image.alt || "Mathé"}
					loading="eager"
				/>
			</h1>
			<NavMenu />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	/* moves up/down with PageTransition component */
	position: relative;
	width: 100%;
	height: 100%;
	background: hsla(0, 0%, 0%, 0.4);
`
const NavLogo = styled.img`
	position: absolute;
	left: 50%;
	height: 48px;
	filter: drop-shadow(${({ theme }) => theme.element.shadow});
	margin-top: 12px;
	transform: translateX(-50%);
	z-index: ${({ theme }) => theme.zIndex.mid};
	// min-width: tablet
	// min-height: med
	@media (min-width: ${({ theme }) => theme.media.tablet}),
		(min-height: ${({ theme }) => theme.media.med}) {
		height: 64px;
	}
	// min-width: desktop
	// min-height: med
	@media (min-width: ${({ theme }) => theme.media.desktop}),
		(min-height: ${({ theme }) => theme.media.med}) {
		height: 96px;
	}
`

// ************
// query
// ************

const query = graphql`
	query NavComponent {
		logo: datoCmsAsset(title: { eq: "Landing Logo" }) {
			title
			image {
				alt
				title
				url
			}
		}
	}
`
