import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
// import animations
import * as anim from "../../utils/animations"
// import store
import { useStore, transitionTriggered } from "../../store/useStore"

const NavMenu = props => {
  const { state, dispatch } = useStore()
  const navRef = useRef(null)
  const cycleRef = useRef(null)
  const [textIndex, setTextIndex] = useState(0)
  const textOptions = ["Premium teas", "Yerba mate"]

  useEffect(() => {
    anim.nav_fadeIn()
  }, [])

  // tracks and handles nav animation.  No state used, so component is not re-rendered!  Score!
  const handleMouseMove = e => {
    const navElem = navRef.current
    const navWidth = navElem.offsetWidth
    const mouseX = e.clientX
    // set navShift based on how many extra navLinks carry off the page.
    // navShift sets the correct starting point for nav mouseMove effect
    // ex: if each navLink is 25vw and there's 2 extra, navShift should equal 50
    const navShift = 0
    const moveX = navShift * (mouseX / navWidth)

    navElem.style.transform = `translateX(${moveX}vw)`
  }

  // ! disabled
  // // function to cycle through text
  // const cycleText = useCallback(() => {
  //   setTextIndex((textIndex + 1) % textOptions.length)
  // }, [textIndex, textOptions.length])
  // // function to turn off text opacity
  // const opacityOff = elem => {
  //   elem.style.opacity = 0
  // }

  // // effect to cycle product text and fade in/out opacity
  // useEffect(() => {
  //   // set opacity 1
  //   cycleRef.current.style.opacity = 1
  //   // set cycle interval
  //   const cycleInterval = 5000
  //   // cycle product text
  //   setTimeout(() => cycleText(cycleInterval), cycleInterval)
  //   // set opacity 0
  //   setTimeout(() => opacityOff(cycleRef.current), cycleInterval - 500)
  // }, [textIndex, cycleText])

  return (
    <Container ref={navRef} onMouseMove={handleMouseMove}>
      <Link
        to="/about"
        className="nav-link"
        onClick={() => {
          transitionTriggered(dispatch, true)
          anim.exit_top(".page-transition", state.transition_duration_page)
        }}
      >
        <div className="nav-item">
          <h1>About</h1>
          <h5>What is Mathé?</h5>
        </div>
      </Link>
      <Link
        to="/products"
        className="nav-link"
        onClick={() => {
          transitionTriggered(dispatch, true)
          anim.exit_top(".page-transition", state.transition_duration_page)
        }}
      >
        <div className="nav-item">
          <h1 ref={cycleRef} className="cycle">
            Shop
            {/* // ! disabled
            {textOptions[textIndex]} */}
          </h1>
          <h5>Premium teas + yerba mate</h5>
        </div>
      </Link>
      <Link
        to="/blog"
        className="nav-link"
        onClick={() => {
          transitionTriggered(dispatch, true)
          anim.exit_top(".page-transition", state.transition_duration_page)
        }}
      >
        <div className="nav-item">
          <h1>Blog</h1>
          <h5>Our stories</h5>
        </div>
      </Link>
      <Link
        to="/contact"
        className="nav-link"
        onClick={() => {
          transitionTriggered(dispatch, true)
          anim.exit_top(".page-transition", state.transition_duration_page)
        }}
      >
        <div className="nav-item">
          <h1>Contact</h1>
          <h5>Get in touch</h5>
        </div>
      </Link>
    </Container>
  )
}
export default NavMenu
NavMenu.propTypes = {}

// ************
// styles
// ************

const Container = styled.div`
  /* moves up/down with PageTransition component */
  position: absolute;
  top: 20%;
  height: 80%;
  width: 100%;
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    top: 0;
    height: 100%;
    /* does not wrap nav elements down to next line */
    /* used for mouse hover/scroll effect */
    white-space: nowrap;
  }
  .nav-link {
    display: inline-block;
    height: 25%;
    width: 100%;
    @media (min-width: ${props => props.theme.tablet + "px"}),
      (orientation: landscape) {
      height: 100%;
      width: 25vw;
    }
    .nav-item {
      display: grid;
      height: 100%;
      width: 100%;
      align-content: center;
      justify-content: center;
      justify-items: center;
      color: white;
      transition: background 200ms;
      h1 {
        font-size: 24px;
        font-weight: 400;
        text-shadow: ${props => props.theme.shadow};
        white-space: normal;
        @media (min-height: ${props => props.theme.tall + "px"}) {
          font-size: 30px;
        }
        @media (min-width: ${props =>
            props.theme.desktop + "px"}) and (min-height: ${props =>
            props.theme.tall + "px"}) {
          font-size: 36px;
        }
        &.cycle {
          transition: opacity 500ms;
        }
      }
      h5 {
        transform: translateY(-2em);
        padding: 0.5em 1em;
        margin: 0.5em 0;
        font-family: ${props => props.theme.fontItalic};
        font-size: 12px;
        font-style: italic;
        font-weight: 300;
        letter-spacing: 0.6px;
        line-height: 1em;
        opacity: 0;
        background: hsla(${props => props.theme.appGreenPartial}, 0.85);
        border-radius: 1em;
        transition: transform 300ms ease-out, opacity 300ms ease-out;
        @media (min-width: ${props => props.theme.tablet + "px"}) {
          font-size: 16px;
        }
      }
      &:hover {
        background: hsla(0, 0%, 0%, 0.5);
        cursor: pointer;
        h5 {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
`
