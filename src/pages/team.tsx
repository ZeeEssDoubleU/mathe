import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import {
	GatsbyImage,
	GatsbyImageProps,
	IGatsbyImageData,
} from "gatsby-plugin-image"
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
	picture: {
		alt: string
		title: string
		gatsbyImageData: IGatsbyImageData
	}
}

export interface MemberQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			medallion: {
				url: string
			}
			content: [
				{
					members: Member_I[]
				},
			]
		}
	}
}

// ************
// component
// ************

export default function Team({ data }: MemberQuery_I): ReactElement {
	const { page } = data
	const { members } = page.content[0]

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

export const query = graphql`
	{
		page: datoCmsPage(title: { eq: "Team" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsTeam {
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
		}
	}
`
