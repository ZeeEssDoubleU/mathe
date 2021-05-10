import React, { useRef, useState, ReactElement, ReactChild } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
// import components
import SEO from "../elements/SEO"
import Hero from "./Hero"
const ScrollToTop = loadable(() => import("../elements/ScrollToTop"))
// import styles
import { Content, ContentWrapper, MarginAuto } from "../../styles/elements"

// ************
// types
// ************

export interface Main_I {
	children?: ReactChild | ReactChild[]
	heroHeader?: string
	heroSubheader?: string
	medallion: {
		url: string
	}
}

// ************
// component
// ************

export default function Main(props: Main_I): ReactElement {
	const mainRef = useRef<HTMLElement>(null)
	const heroRef = useRef<HTMLElement>(null)
	const [showScrollToTop, showScrollToTop_set] = useState<boolean>(false)

	return (
		<Container
			ref={mainRef}
			id="mainScroll"
			onScroll={() => {
				// if mainRef and heroRef exist
				if (mainRef.current && heroRef.current) {
					// show scroll to top button if scrolled below hero section
					showScrollToTop_set(
						mainRef.current.scrollTop >= heroRef.current.clientHeight,
					)
				}
			}}
		>
			<SEO title={props.heroSubheader} />
			<Hero
				ref={heroRef}
				header={props.heroHeader}
				subHeader={props.heroSubheader}
				medallion={props.medallion}
			/>
			<Content>
				<MarginAuto>
					<ContentWrapper>{props.children}</ContentWrapper>
				</MarginAuto>
				<ScrollToTop show={showScrollToTop} scrollElem={mainRef} />
			</Content>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.main`
	/* moves up/down with PageTransition component */
	position: absolute;
	top: 100%;
	height: 100%;
	width: 100%;

	overflow: auto;
	-webkit-overflow-scrolling: touch;
`
