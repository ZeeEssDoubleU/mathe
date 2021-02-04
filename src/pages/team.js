import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import sanitizeHtml from "sanitize-html"
// import components
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

const Team = () => {
  const { page } = useStaticQuery(query)
  const { members } = page

  const displayMembers = members.map(member => {
    return (
      <div className="member-section" key={member.id}>
        <Image
          title={member.picture.title}
          alt={member.picture.alt}
          fluid={{ ...member.picture.fluid }}
        />
        <h4>{member.name}</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(member.bio),
          }}
        />
        <Divider />
      </div>
    )
  })

  const contentSection = (
    <>
      <Section>
        <Header>{/* <h3></h3>
					<h5></h5> */}</Header>
        <Body>{displayMembers}</Body>
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
Team.propTypes = {}
export default Team

// ************
// styles
// ************

const Header = styled(ContentHeader)``
const Body = styled(ContentBody)`
  .member-section {
    h4 {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;

      color: ${props => props.theme.appGreen};
    }
    p {
      text-align: left;
      margin-top: 16px;
      white-space: pre-wrap;
    }
  }
`
const Image = styled(Img)`
  float: left;
  height: 200px;
  width: 200px;
  margin: 0 24px 24px 0;
  border-radius: 0.25em;
`

// ************
// query
// ************

const query = graphql`
  {
    page: datoCmsTeamPage {
      header
      subHeader
      medallion {
        url
      }
      members {
        id
        name
        picture {
          alt
          title
          fluid {
            ...GatsbyDatoCmsFluid
          }
        }
        bio
      }
    }
  }
`
