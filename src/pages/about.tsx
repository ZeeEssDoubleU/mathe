import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
// import components
import Main from "../components/Layout/Main"
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
	ContentTitle,
	ContentSubtitle,
} from "../styles/elements"

// ************
// types
// ************

export interface AboutQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			medallion: {
				url: string
			}
			content: [
				{
					__typename: "DatoCmsContentBlock"
					header: string
					subHeader: string
					htmlEditor: string
				},
				{
					__typename: "DatoCmsQuote"
					quote: string
					author: string
					title: string
				},
			]
		}
	}
}

// ************
// component
// ************

export default function About({ data }: AboutQuery_I): ReactElement {
	const { page } = data
	const content = page.content[0]
	const quote = page.content[1]

	const contentSection: ReactElement = (
		<>
			<Section>
				<Header>
					<h3>{content.header}</h3>
					<h4>{content.subHeader}</h4>
				</Header>
				<Body
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(content.htmlEditor),
					}}
				/>
			</Section>
			<Divider />
			<Section>
				<Quote>
					<blockquote
						className="quote"
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(quote.quote),
						}}
					/>
				</Quote>
				<Author>{quote.author}</Author>
				<AuthorTitle>{quote.title}</AuthorTitle>
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

const Author = styled(ContentTitle)`
	font-size: 24px;
	text-align: right;
`
const Header = styled(ContentHeader)``
const Body = styled(ContentBody)``
const Quote = styled(ContentBody)`
	font-style: italic;
`
const AuthorTitle = styled(ContentSubtitle)`
	text-align: right;
`

// ************
// query
// ************

export const query = graphql`
	{
		page: datoCmsPage(title: { eq: "About" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsContentBlock {
					id
					header
					subHeader
					htmlEditor
				}
				... on DatoCmsQuote {
					quote
					author
					title
				}
			}
		}
	}
`
