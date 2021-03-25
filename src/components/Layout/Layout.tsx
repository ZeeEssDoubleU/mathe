import React, { ReactElement, useEffect, useLayoutEffect } from "react"
import { PageProps, useStaticQuery, graphql } from "gatsby"
// import styles
import styled from "styled-components"
// import components
import Nav from "../Nav/Nav"
import Background from "../elements/Background"
// import Snipcart from "../Cart/Snipcart/Snipcart"
import ShopifyCart from "../Cart/Shopify/Shopify"
// impprt store
import { useCategory, useTransition } from "../../store"
// import utils
import * as anim from "../../utils/animations"

// ************
// types
// ************

export interface Layout_I {
	children?: ReactElement | ReactElement[]
	path: PageProps["path"]
}
export interface LayoutQuery_I {
	categories: {
		nodes: {
			title: string
			slug: string
		}[]
	}
}

// ************
// component
// ************

export default function Layout({ children, path }: Layout_I): ReactElement {
	const { categories }: LayoutQuery_I = useStaticQuery(query)
	const state_category = useCategory()
	const state_transition = useTransition()

	// effect sets nav (actually whole app) position when mounted and when path changes
	useLayoutEffect(() => {
		// check if transition was triggered from button press (Link, BackButton, etc)
		// if not, set page-transition elem position
		if (state_transition.inProgress === false) {
			path === "/"
				? anim.enter_top_set(".page-transition")
				: anim.exit_top_set(".page-transition")
		} else {
			state_transition.setInProgress(false)
		}
	}, [path])

	// change selected state_category on path change
	useEffect(() => {
		state_category.selectCategory({ categories, path })
	}, [path])

	return (
		<Container>
			<Background path={path} />
			<PageTransition className="page-transition">
				<Nav />
				{children}
			</PageTransition>
			{/* <Snipcart /> */}
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
const PageTransition = styled.div`
	/* moves up/down when nav link clicked */
	position: relative;
	height: 100%;
	width: 100%; ;
`

// ************
// query
// ************

const query = graphql`
	{
		categories: allDatoCmsCategory {
			nodes {
				title
				slug
			}
		}
	}
`
