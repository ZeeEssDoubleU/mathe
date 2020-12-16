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

export default function CartTab({ show, scrollElem, ...props }) {
  gsap.registerPlugin(ScrollToPlugin)

  return (
    <Container className="snipcart-checkout">
      <Icon name="cart-zoom" />
    </Container>
  )
}

// ************
// styles
// ************

const Container = styled(CategoryButton)`
  position: fixed;
  z-index: 99;
  top: 15%;
  right: -0.5rem;
  height: 3.5rem;
  width: 3.5rem;
  padding: calc(0.6rem + 0.25rem);
  border-radius: 1em 0 0 1em;
  background: ${props => props.theme.background};
  fill: ${props => props.theme.appGreen};

  &:hover {
    background: hsla(${props => props.theme.appGreenPartial}, 0.5);
    border: 1px solid ${props => props.theme.appGreen};
    fill: white;
    cursor: pointer;
  }
`
