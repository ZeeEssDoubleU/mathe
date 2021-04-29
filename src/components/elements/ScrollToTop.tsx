import React, { ReactElement, RefObject } from "react"
import styled from "styled-components"
// import components
import Icon from "../Icon"
// import styles / anim
import { ModalButton } from "../../styles/elements"
import { scroll_top } from "../../utils/animations"

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
	return (
		<Container
			show={show}
			onClick={() => scroll_top(scrollElem.current)}
			className="gtm scroll-top"
		>
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
