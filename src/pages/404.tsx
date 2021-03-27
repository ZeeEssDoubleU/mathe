import React, { ReactElement } from "react"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { graphql } from "gatsby"
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
// types
// ************

export interface NotFoundQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			content: {
				__typename: "DatoCmsContentBlock"
				header: string
				subHeader: string
				htmlEditor: string
			}[]
			medallion: {
				url: string
			}
		}
	}
}

// ************
// component
// ************

export default function NotFound({ data }: NotFoundQuery_I): ReactElement {
	const { page } = data
	const content = page.content[0]

	const contentSection: ReactElement = (
		<>
			<Section>
				<Header>
					<h3>{content.header}</h3>
					<h4>{content.subHeader}</h4>
				</Header>
				<Body
					onClick={() => {
						// navigates back
						navigate(-1)
					}}
				>
					<Icon name="back-chevron" />
					<div
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(content.htmlEditor),
						}}
					/>
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

// ************
// styles
// ************

const Header = styled(ContentHeader)``
const Body = styled(ContentBody)`
	text-align: center;
	transition: transform 300ms;
	cursor: pointer;

	svg {
		height: 16px;
		width: 16px;
		margin-right: 16px;
		fill: white;
		vertical-align: middle;
	}
	div,
	p {
		display: inline;
	}
	&:hover {
		transform: translateX(-5px);
	}
`

// ************
// query
// ************

export const query = graphql`
	{
		page: datoCmsPage(title: { eq: "404" }) {
			header
			subHeader
			content {
				... on DatoCmsContentBlock {
					header
					subHeader
					htmlEditor
				}
			}
			medallion {
				url
			}
		}
	}
`
