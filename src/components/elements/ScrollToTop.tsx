import React, {
	ElementRef,
	PropsWithRef,
	ReactElement,
	RefAttributes,
	RefObject,
} from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import components
import Icon from "../Icons/Icon"
// import styles
import { ModalButton } from "../../styles/elements"
// import animation
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
	gsap.registerPlugin(ScrollToPlugin)

	return (
		<Container show={show}>
			<Icon
				name="up-chevron"
				onClick={() => scroll_top(scrollElem.current)}
			/>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled(ModalButton)<{ show: boolean }>`
	/* TODO: eventually change this to be located on layout component */
	bottom: calc(-100% + 24px);
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
`
