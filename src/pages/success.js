import React from "react"
import styled from "styled-components"
import { useStaticQuery } from "gatsby"
import { navigate } from "@reach/router"
// import components
import Main from "../components/Layout/Main"
import Icon from "../components/Icons/Icon"
// import styles
import {
  ContentHeader,
  ContentBody,
  Divider,
  Section,
} from "../styles/elements"

// ************
// component
// ************

const Success = () => {
  const { page } = useStaticQuery(query)
  const content = page.content[0]

  const contentSection = (
    <>
      <Section>
        <Header>
          <h3>{content.header}</h3>
          <h5>{content.subHeader}</h5>
        </Header>
        <Body
          onClick={() => {
            // navigates back
            navigate(-1)
          }}
        >
          <Icon name="back-arrow" />
          {content.content}
        </Body>
      </Section>
      <Divider />
    </>
  )

  return (
    <Main
      heroHeader={page.header}
      heroSubheader={page.subHeader}
      medallion={page.medallion}
    >
      {contentSection}
    </Main>
  )
}
Success.propTypes = {}
export default Success

// ************
// styles
// ************

const Header = styled(ContentHeader)``
const Body = styled(ContentBody)`
  text-align: center;
  transition: transform 300ms;
  cursor: pointer;

  svg {
    height: 1em;
    width: 1em;
    margin-right: 1em;
    fill: white;
    vertical-align: middle;
  }
  &:hover {
    transform: translateX(-2.5%);
  }
`

// ************
// query
// ************

const query = graphql`
  {
    page: datoCmsSuccessPage {
      header
      subHeader
      content {
        ... on DatoCmsContentBlock {
          header
          subHeader
          content
        }
      }
      medallion {
        url
      }
    }
  }
`
