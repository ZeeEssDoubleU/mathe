import React, { ReactElement } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Page_I } from "../@types/query"
// import components
import ContactDetails from "../components/Contact/ContactDetails"
import ContactForm from "../components/Contact/ContactForm"
import Main from "../components/Layout/Main"
// import styles
import {
  ContentHeader,
  ContentBody,
  Divider,
  Section,
} from "../styles/elements"

// ************
// types
// ************

export interface ContactQuery_I extends Page_I {
  sections: {
    edges: {
      node: {
        header: string
        contentSection: [
          {
            __typename: "DatoCmsHeader"
            header: string
          },
          {
            __typename: "DatoCmsSubHeader"
            subHeader: string
          },
          {
            __typename: "DatoCmsContent"
            content: string
          },
          {
            __typename: "DatoCmsContactInfo"
            address: string
            phone: string
            email: string
            facebook: string
            instagram: string
          },
          {
            __typename: "DatoCmsForm"
            form: string
          },
          {
            __typename: "DatoCmsDivider"
            divider: string
          }
        ]
      }
    }[]
  }
}

// ************
// component
// ************

export default function Contact(): ReactElement {
  const { page, sections }: ContactQuery_I = useStaticQuery(query)

  const contentSection: ReactElement[] = sections.edges.map(
    (section, index1): ReactElement => (
      <Section key={index1}>
        <Header>
          <h3>{section.node.header}</h3>
          {section.node.contentSection.map(
            (elem, index2): ReactElement | null => {
              return elem.__typename === "DatoCmsSubHeader" ? (
                <h5 key={index2}>{elem.subHeader}</h5>
              ) : null
            }
          )}
        </Header>
        <Body>
          {section.node.contentSection.map(
            (elem, index3): ReactElement | null => {
              switch (elem.__typename) {
                case "DatoCmsContent":
                  return <p key={index3}>{elem.content}</p>
                case "DatoCmsContactInfo":
                  return <ContactDetails elem={elem} key={index3} />
                case "DatoCmsForm":
                  return <ContactForm key={index3} />
                case "DatoCmsDivider":
                  return <Divider key={index3} />
                default:
                  return null
              }
            }
          )}
        </Body>
      </Section>
    )
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
    margin-top: 16px;
  }
`

// ************
// query
// ************

const query = graphql`
  {
    page: datoCmsContactPage {
      header
      subHeader
      medallion {
        url
      }
    }
    sections: allDatoCmsContactPageSection {
      edges {
        node {
          header
          contentSection {
            ... on DatoCmsHeader {
              header
            }
            ... on DatoCmsSubHeader {
              subHeader
            }
            ... on DatoCmsContent {
              content
            }
            ... on DatoCmsContactInfo {
              address
              phone
              email
              facebook
              instagram
            }
            ... on DatoCmsForm {
              form
            }
            ... on DatoCmsDivider {
              divider
            }
          }
        }
      }
    }
  }
`
