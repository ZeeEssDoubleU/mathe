import React, { ReactElement, RefObject } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import components
import Icon from "../Icons/Icon"
// import styles
import { ModalButton } from "../../styles/elements"

// ************
// types
// ************

interface ScrollToTop_I {
	show: boolean
	scrollElem: RefObject<HTMLElement>
}

// ************
// component
// ************

export default function ScrollToTop({
	show,
	scrollElem,
}: ScrollToTop_I): ReactElement {
	gsap.registerPlugin(ScrollToPlugin)

	// scroll animation
	function scroll_top(targetElem: HTMLElement | null): void {
		gsap.to(targetElem, { scrollTo: 0 })
	}

	return (
		<Container show={show} onClick={() => scroll_top(scrollElem.current)}>
			<Icon name="up-chevron" />
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(ModalButton)<{ show: boolean }>`
	/* TODO: eventually change this to be located on layout component */
	bottom: calc(-100% + 1.5rem);
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
`
