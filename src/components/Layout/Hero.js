import React from "react"
import styled from "styled-components"
import SVG from "react-inlinesvg"
// import components
import BackButton from "../elements/BackButton"
// import styles

// ************
// component
// ************

const Hero = props => {
  return (
    <Container>
      <BackButton />
      <Headers>
        {props.subHeader && <SubHeader>{props.subHeader}</SubHeader>}
        {props.header && <Header>{props.header}</Header>}
      </Headers>
      <Medallion>
        {props.medallion && <SVG src={props.medallion.url}></SVG>}
      </Medallion>
    </Container>
  )
}
Hero.propTypes = {}
export default Hero

// ************
// styles
// ************

const Container = styled.header`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  @media (min-height: ${props => props.theme.short + "px"}) {
    height: 75%;
  }
  @media (min-height: ${props => props.theme.med + "px"}) {
    height: 45%;
  }
`

const Headers = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  color: white;
  transform: translateX(-50%) translateY(-50%);
`
const Header = styled.h1`
  font-size: 24px;
  font-weight: 400;
  text-shadow: ${props => props.theme.shadow};
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    font-size: 32px;
  }
  @media (min-width: ${props => props.theme.desktop + "px"}) {
    font-size: 48px;
  }
`
const SubHeader = styled.h1`
  display: inline-block;
  background: hsla(${props => props.theme.appGreenPartial}, 0.85);
  border-radius: 1em;
  font-size: 16px;
  font-weight: 300;
  /* letter-spacing: 0.1em; */
  margin: 12px 0;
  padding: 4px 16px;
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    font-size: 20px;
  }
`

const Medallion = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  height: 64px;
  width: 64px;

  display: grid;
  align-content: center;
  justify-content: center;

  border: none;
  border-radius: 50%;
  background: ${props => props.theme.appGreen};

  svg {
    height: 30px;
    width: 30px;

    fill: white;
  }
`
