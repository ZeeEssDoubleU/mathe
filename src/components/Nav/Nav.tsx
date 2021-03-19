import React, { ReactElement } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
// import components
import NavMenu from "./NavMenu"

// ************
// types
// ************

interface Query_I {
	logo: {
		title: string
		image: {
			alt: string
			title: string
			url: string
		}
	}
}

// ************
// component
// ************

export default function Nav(): ReactElement {
	const { logo }: Query_I = useStaticQuery(query)

	return (
		<Container>
			<h1 className="nav-logo">
				<NavLogo
					src={logo.image.url}
					title={logo.image.title}
					alt={logo.image.alt}
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
	filter: drop-shadow(${({ theme }) => theme.shadow});
	margin-top: 12px;
	transform: translateX(-50%);
	z-index: 99;
	// min-width: tablet
	// min-height: med
	@media (min-width: ${({ theme }) => theme.tablet}px),
		(min-height: ${({ theme }) => theme.med}px) {
		height: 64px;
	}
	// min-width: desktop
	// min-height: med
	@media (min-width: ${({ theme }) => theme.desktop}px),
		(min-height: ${({ theme }) => theme.med}px) {
		height: 96px;
	}
`

// ************
// query
// ************

const query = graphql`
	{
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
