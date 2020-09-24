import React from "react"
import styled from "styled-components"
// import components
import SEO from "../SEO"
import Hero from "./Hero"
// import styles
import { Content, ContentWrapper, MarginAuto } from "../../styles/elements"

// ************
// component
// ************

const Main = props => {
  return (
    <Container>
      <SEO />
      <Hero
        header={props.heroHeader}
        subHeader={props.heroSubheader}
        medallion={props.medallion}
      />
      <Content>
        <MarginAuto>
          <ContentWrapper>{props.content}</ContentWrapper>
        </MarginAuto>
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
`
