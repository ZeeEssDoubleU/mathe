import React from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import components
import Icon from "../Icons/Icon"
// import styles
import { CategoryButton } from "../../styles/elements"
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

const Container = styled(CategoryButton)`
  position: fixed;
  z-index: 99;
  bottom: calc(-100% + 1.5rem);
  right: 1.5rem;
  height: 3.5rem;
  width: 3.5rem;
  padding: 0.75rem;
  border-radius: 50%;
  background: ${props => props.theme.background};
  fill: ${props => props.theme.appGreen};
  opacity: ${props => (props.show ? 1 : 0)};

  @media (max-width: ${props => props.theme.tablet}px) {
    left: calc(100% - 3rem - 2rem);
    height: 3rem;
    width: 3rem;
  }

  &:hover {
    background: hsla(${props => props.theme.appGreenPartial}, 0.5);
    border: 1px solid ${props => props.theme.appGreen};
    fill: white;
    cursor: pointer;
  }
`
