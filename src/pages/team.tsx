import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image"
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
// types
// ************

export interface Member_I {
	id: string
	name: string
	bio: string
	picture: GatsbyImageProps
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

	const displayMembers: ReactElement[] = members.map(
		(member): ReactElement => (
			<div className="member-section" key={member.id}>
				<Image
					title={member.picture.title}
					alt={member.picture.alt}
					image={member.picture.gatsbyImageData}
				/>
				<Header>{member.name}</Header>
				<Body
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(member.bio),
					}}
				/>
				<Divider />
			</div>
		),
	)

	const contentSection: ReactElement = <Section>{displayMembers}</Section>

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

const Image = styled(GatsbyImage)<GatsbyImageProps>`
	float: left;
	height: 200px;
	width: 200px;
	margin: 0 24px 24px 0;
	border-radius: 0.25em;

	@media (max-width: ${({ theme }) => theme.tablet}px) {
		float: none;
		margin: auto;
	}
`
const Header = styled(ContentHeader)`
	margin-bottom: 16px;

	font-size: 24px;
	font-weight: 300;
	text-align: left;
	text-transform: uppercase;
	color: ${({ theme }) => theme.appGreen};

	@media (max-width: ${({ theme }) => theme.tablet}px) {
		margin: 1rem auto;
		text-align: center;
	}
`
const Body = styled(ContentBody)`
	margin: auto;
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
					gatsbyImageData(layout: FULL_WIDTH)
				}
			}
		}
	}
`
