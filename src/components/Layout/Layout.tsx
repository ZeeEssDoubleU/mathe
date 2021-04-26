import React, { ReactElement, useEffect, useLayoutEffect } from "react"
import { PageProps, useStaticQuery, graphql } from "gatsby"
// import styles
import styled from "styled-components"
// import components
import Nav from "../Nav"
import Background from "../Background"
import ShopifyCart from "../Cart/Shopify"
// impprt store
import { AnimationState_I, useCategory, useAnimation } from "../../redux"
import { LayoutComponentQuery } from "../../graphql/types"

// ************
// types
// ************

export interface Layout_I {
	children?: ReactElement | ReactElement[]
	path: PageProps["path"]
}

// ************
// component
// ************

export default function Layout({ children, path }: Layout_I): ReactElement {
	const { categories }: LayoutComponentQuery = useStaticQuery(query)
	const state_category = useCategory()
	const state_animation = useAnimation()

	// effect sets nav (actually whole app) position when mounted and when path changes
	useLayoutEffect(() => {
		path === "/"
			? state_animation.setTranslate_page("down")
			: state_animation.setTranslate_page("up")
	}, [])

	// change selected state_category on path change
	useEffect(() => {
		state_category.selectCategory({ categories, path })
	}, [path])

	return (
		<Container>
			<Background />
			<PageTransition translatePage={state_animation.translate_page}>
				<Nav />
				{children}
			</PageTransition>
			<ShopifyCart />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	/* always stayes bound relative to viewport */
	position: fixed;
	height: 100%;
	width: 100%;

	/* so nav isn't visible when pulling down */
	overflow: hidden;
`
const PageTransition = styled.div<{
	translatePage: AnimationState_I["translate_page"]
}>`
	/* moves up/down when nav link clicked */
	position: relative;
	height: 100%;
	width: 100%;
	transform: ${({ translatePage }) =>
		`translateY(${translatePage === "up" ? "-100%" : 0})`};
	transition: ${({ theme }) =>
		`transform ${theme.duration.page_translateY}ms`};
`

// ************
// query
// ************

const query = graphql`
	query LayoutComponent {
		categories: allDatoCmsCategory {
			nodes {
				title
				slug
			}
		}
	}
`
