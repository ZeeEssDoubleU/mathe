import React, { ReactElement } from "react"
import styled from "styled-components"
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image"
import sanitizeHtml from "sanitize-html"
// import components
import Main from "../../Layout/Main"
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
} from "../../../styles/elements"
// import types
import { TeamPageQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function Team(props: TeamPageQuery["page"]): ReactElement {
	const { members } = props.content[0]

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
			heroHeader={props.header}
			heroSubheader={props.subHeader}
			medallion={props.medallion}
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
	border-radius: 04px;

	@media (max-width: ${({ theme }) => theme.media.tablet}) {
		float: none;
		margin: auto;
	}
`
const Header = styled(ContentHeader)`
	margin-bottom: 16px;

	font-size: 24px;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
	text-align: left;
	text-transform: uppercase;
	color: ${({ theme }) => theme.color.app_green};

	@media (max-width: ${({ theme }) => theme.media.tablet}) {
		margin: 16px auto;
		text-align: center;
	}
`
const Body = styled(ContentBody)`
	margin: auto;
`
