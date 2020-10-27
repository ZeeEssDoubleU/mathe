import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
// import components
import { ContactDetails } from "../components/Contact/ContactDetails"
import { ContactForm } from "../components/Contact/ContactForm"
import Main from "../components/Layout/Main"
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

const Contact = () => {
  const { page, sections } = useStaticQuery(query)

  const contentSection = sections.edges.map((section, index1) => (
    <Section key={index1}>
      <Header>
        <h3>{section.node.header}</h3>
        {section.node.contentSection.map((elem, index2) => {
          return elem.subHeader ? <h5 key={index2}>{elem.subHeader}</h5> : null
        })}
        {/* TODO: debug, remove when ready */}
        {/* <h3>
					<Link to="/success">To Success!</Link>
				</h3> */}
      </Header>
      <Body>
        {section.node.contentSection.map((elem, index3) => {
          if (elem.content) {
            return <p key={index3}>{elem.content}</p>
          } else if (elem.__typename === "DatoCmsContactInfo") {
            return <ContactDetails elem={elem} key={index3} />
          } else if (elem.form) {
            return <ContactForm key={index3} />
          } else if (elem.divider) {
            return <Divider key={index3} />
          } else {
            return null
          }
        })}
      </Body>
    </Section>
  ))

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
Contact.propTypes = {}
export default Contact

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
