import React, { useRef, useState } from "react"
import styled from "styled-components"
// import components
import SEO from "../SEO"
import Hero from "./Hero"
import ScrollToTop from "../elements/ScrollToTop"
// import styles
import { Content, ContentWrapper, MarginAuto } from "../../styles/elements"

// ************
// component
// ************

const Main = props => {
  const mainRef = useRef()
  const heroRef = useRef()
  const [showScrollToTop, showScrollToTop_set] = useState(false)

  return (
    <Container
      ref={mainRef}
      id="mainScroll"
      onScroll={() =>
        // show scroll to top button if scrolled below hero section
        showScrollToTop_set(
          mainRef.current.scrollTop >= heroRef.current.clientHeight
        )
      }
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
Main.propTypes = {}
export default Main

const Container = styled.main`
  /* moves up/down with PageTransition component */
  position: absolute;
  top: 100%;
  height: 100%;
  width: 100%;

  overflow: auto;
  -webkit-overflow-scrolling: touch;
`
