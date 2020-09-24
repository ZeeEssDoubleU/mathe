import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
// import store
import { useStore, transitionTriggered } from "../../store/useStore"
// import animations
import * as anim from "../../utils/animations"

// ************
// component
// ************

const BackButton = props => {
  const { state, dispatch } = useStore()

  return (
    <Link
      to="/"
      aria-label="close page / back to home"
      onClick={e => {
        e.preventDefault()
        transitionTriggered(dispatch, true)
        anim.enter_top(".page-transition", state.transition_duration_page)
        setTimeout(() => {
          navigate("/")
          // multiply by 1000 for setTimeout to convert store's duration correctly
        }, state.transition_duration_page * 1000)
      }}
    >
      <Container>
        <Inner>
          {/* bars of arrow or X */}
          <div className="shape left" />
          <div className="shape right" />
        </Inner>
      </Container>
    </Link>
  )
}
BackButton.propTypes = {}
export default React.memo(BackButton)

// ************
// styles
// ************

// variables for quick customization of hamburger
const backVars = {}
backVars.layerHeight = 2
backVars.buttonWidth = 50
backVars.buttonHeight = backVars.buttonWidth
backVars.layerRadius = 4

const Container = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 12px;
`
// sizing of button
const Inner = styled.div`
  position: relative;
  width: ${backVars.buttonWidth * 0.75}px;
  height: ${backVars.buttonHeight * 0.75}px;
  filter: drop-shadow(${props => props.theme.shadow});
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    width: ${backVars.buttonWidth}px;
    height: ${backVars.buttonHeight}px;
  }
  /* shape of each bar (arrow or X) */
  .shape {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: ${backVars.layerHeight}px;
    background: white;
    height: ${backVars.layerHeight * 0.75}px;
    border-radius: ${backVars.layerRadius * 0.75}px;
    @media (min-width: ${props => props.theme.tablet + "px"}) {
      border: none;
      border-radius: ${backVars.layerRadius}px;
    }
  }
  .left {
    transform: rotate(45deg) translateY(-50%);
    transition: transform 0.3s, transform-origin 0.3s;
  }
  .right {
    transform: rotate(-45deg) translateY(-50%);
    transition: transform 0.3s, transform-origin 0.3s;
  }
  &:hover {
    .left {
      transform-origin: calc(50% + 33%) center;
      transform: rotate(45deg) translateY(-50%) translateX(33%);
    }
    .right {
      transform-origin: calc(50% - 33%) center;
      transform: rotate(-45deg) translateY(-50%) translateX(-33%);
    }
  }
`
