import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
// import components
import NavMenu from "./NavMenu"

const Nav = props => {
  const { datoCmsLandingPage } = useStaticQuery(query)
  const { logo } = datoCmsLandingPage

  return (
    <Container>
      <h1 className="nav-logo">
        <NavLogo src={logo.url} title={logo.title} alt={logo.alt} />
      </h1>
      <NavMenu />
    </Container>
  )
}
Nav.propTypes = {}
export default Nav

// ************
// query
// ************

const query = graphql`
  {
    datoCmsLandingPage {
      logo {
        url
        title
        url
      }
    }
  }
`

// ************
// styles
// ************

const Container = styled.div`
  /* moves up/down with PageTransition component */
  position: relative;
  width: 100%;
  height: 100%;
  background: hsla(0, 0%, 0%, 0.4);
`
const NavLogo = styled.img`
  position: absolute;
  left: 50%;
  height: 48px;
  filter: drop-shadow(${props => props.theme.shadow});
  margin-top: 12px;
  transform: translateX(-50%);
  z-index: 99;
  @media (min-width: ${props => props.theme.tablet + "px"}),
    (min-height: ${props => props.theme.med + "px"}) {
    height: 64px;
  }
  @media (min-width: ${props =>
      props.theme.desktop + "px"}) and (min-height: ${props =>
      props.theme.med + "px"}) {
    height: 96px;
  }
`
