import React, { ReactElement } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
// import components
import Main from "../components/Layout/Main"
// import styles
import { ContentHeader, ContentBody, Section } from "../styles/elements"

// ************
// types
// ************

export interface BlogQuery_I {
  page: {
    header: string
    subHeader: string
    content: {
      __typename: "DatoCmsContentBlock"
      header: string
      subHeader: string
      content: string
    }
    medallion: {
      url: string
    }
  }
}

// ************
// component
// ************

export default function Blog(): ReactElement {
  const { page }: BlogQuery_I = useStaticQuery(query)

  const contentSection: ReactElement = (
    <>
      <Section>
        <Header>
          <h3>Coming soon</h3>
          <h5>{null}</h5>
        </Header>
        <Body>
          <p>
            Our blog is currently under construction and will be available soon.
          </p>
        </Body>
      </Section>
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

// ************
// styles
// ************

const Header = styled(ContentHeader)``
const Body = styled(ContentBody)`
  p {
    text-align: left;
    margin-top: 16px;
  }
`

// ************
// query
// ************

const query = graphql`
  {
    page: datoCmsBlogPage {
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