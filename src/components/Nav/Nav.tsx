import React, { ReactElement } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
// import components
import NavMenu from "./NavMenu"

// ************
// types
// ************

interface Query_I {
  datoCmsLandingPage: {
    logo: {
      url: string
      title: string
      alt: string
    }
  }
}

// ************
// component
// ************

export default function Nav(): ReactElement {
  const { datoCmsLandingPage }: Query_I = useStaticQuery(query)
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
  filter: drop-shadow(${({ theme }) => theme.shadow});
  margin-top: 12px;
  transform: translateX(-50%);
  z-index: 99;
  // min-width: tablet
  // min-height: med
  @media (min-width: ${({ theme }) => theme.tablet}px),
    (min-height: ${({ theme }) => theme.med}px) {
    height: 64px;
  }
  // min-width: desktop
  // min-height: med
  @media (min-width: ${({ theme }) => theme.desktop}px),
    (min-height: ${({ theme }) => theme.med}px) {
    height: 96px;
  }
`

// ************
// query
// ************

const query = graphql`
  {
    datoCmsLandingPage {
      logo {
        url
        title
        alt
      }
    }
  }
`
