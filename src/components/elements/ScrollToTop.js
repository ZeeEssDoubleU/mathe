import React from "react"
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
// component
// ************

export default function ScrollToTop({ show, scrollElem, ...props }) {
  gsap.registerPlugin(ScrollToPlugin)

  return (
    <Container {...{ show }}>
      <Icon name="up-chevron" onClick={() => scroll_top(scrollElem.current)} />
    </Container>
  )
}

// ************
// styles
// ************

const Container = styled(ModalButton)`
  /* TODO: eventually change this to be located on layout component */
  bottom: calc(-100% + 1.5rem);
  visibility: ${props => (props.show ? "visible" : "hidden")};
`
