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
} from "../styles/elements"

// ************
// types
// ************

// TODO: make sure type checks working
export interface AboutQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			content: [
				{
					__typename: "DatoCmsContentBlock"
					header: string
					subHeader: string
					content: string
				},
				{
					__typename: "DatoCmsQuote"
					quote: string
					author: string
					title: string
				},
			]
			medallion: {
				url: string
			}
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
					<h5>{content.subHeader}</h5>
				</Header>
				<Body
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(content.content),
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
					<h3 className="author">{quote.author}</h3>
					<h5 className="title">{quote.title}</h5>
				</Quote>
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
const Body = styled(ContentBody)``
const Quote = styled(ContentBody)`
	.quote {
		font-style: italic;
	}
	.author {
		font-size: 24px;
		font-weight: 300;
		text-align: right;
	}
	.title {
		margin: 0;
		text-align: right;
		font-family: ${({ theme }) => theme.fontItalic};
		font-style: italic;
		font-size: 16px;
		font-weight: 300;
		letter-spacing: 0.03em;
		color: ${({ theme }) => theme.appGreen};
	}
`

// ************
// query
// ************

export const query = graphql`
	{
		page: datoCmsAboutPage {
			header
			subHeader
			content {
				... on DatoCmsContentBlock {
					header
					subHeader
					content
				}
				... on DatoCmsQuote {
					quote
					author
					title
				}
			}
			medallion {
				url
			}
		}
	}
`
