import React, { useEffect, useRef, useLayoutEffect } from "react"
import styled from "styled-components"
import GlobalStyle from "../../styles/global"
// import components
import Nav from "../Nav/Nav"
import Background from "../elements/Background"
// impprt store
import {
  useStore,
  savePrevPath,
  saveCurrentPath,
  transitionTriggered,
} from "../../store/useStore"
// import utils
import * as anim from "../../utils/animations"
import { useWindowResize } from "../../utils/useWindowResize"

// ************
// component
// ************

const Layout = ({ children, location }) => {
  const { state, dispatch } = useStore()
  const didMountRef = useRef(false)
  const { pathname } = location

  const windowSize = useWindowResize()

  useEffect(() => {
    saveCurrentPath(dispatch, pathname)
    return () => {
      savePrevPath(dispatch, pathname)
    }
  }, [dispatch, pathname])

  // effect sets nav (actually whole app) position when mounted and when pathname changes
  useLayoutEffect(() => {
    // check if transition was triggered from button press (Link, BackButton, etc)
    // if not, set page-transition elem position
    if (state.transition_triggered_page === false) {
      pathname === "/"
        ? anim.enter_top_set(".page-transition")
        : anim.exit_top_set(".page-transition")
    } else {
      transitionTriggered(dispatch, false)
    }
  }, [pathname])

  return (
    <Container>
      <GlobalStyle />
      <Background />
      <PageTransition className="page-transition">
        <Nav />
        {/* children are page elements */}
        {children}
      </PageTransition>
    </Container>
  )
}
Layout.propTypes = {}
export default Layout

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
