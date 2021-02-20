import React, { ReactElement, ReactFragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img, { GatsbyImageFluidProps } from "gatsby-image"
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
import GatsbyImage from "gatsby-image"

// ************
// types
// ************

export interface Member_I {
  id: string
  name: string
  bio: string
  picture: GatsbyImageFluidProps
}

// TODO: make sure type checks working
export interface MemberQuery_I {
  page: {
    header: string
    subHeader: string
    medallion: {
      url: string
    }
    members: Member_I[]
  }
}

// ************
// component
// ************

export default function Team(): ReactElement {
  const { page }: MemberQuery_I = useStaticQuery(query)
  const { members } = page

  const displayMember_Is: ReactElement[] = members.map(
    (member): ReactElement => (
      <div className="member-section" key={member.id}>
        <Image
          title={member.picture.title}
          alt={member.picture.alt}
          fluid={member.picture.fluid}
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
  )

  const contentSection: ReactElement = (
    <Section>
      {/* // TODO: fill header if needed */}
      <Header></Header>
      <Body>{displayMember_Is}</Body>
    </Section>
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
  .member-section {
    h4 {
      font-size: 24px;
      font-weight: 300;
      text-transform: uppercase;

      color: ${({ theme }) => theme.appGreen};
    }
    p {
      text-align: left;
      margin-top: 16px;
      white-space: pre-wrap;
    }
  }
`
const Image = styled(Img)<GatsbyImageFluidProps>`
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
        bio
        picture {
          alt
          title
          fluid {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
`
