import React, { ReactElement } from "react"
import styled from "styled-components"
import { sanitize } from "isomorphic-dompurify"
// import components
import Main from "../../Layout/Main"
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
	ContentTitle,
	ContentSubtitle,
} from "../../../styles/elements"
// import types
import { AboutPageQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function About(props: AboutPageQuery["page"]): ReactElement {
	const content = props.content[0]
	const quote = props.content[1]

	const contentSection: ReactElement = (
		<>
			<Section>
				<Header>
					{"header" in content && <h3>{content.header}</h3>}
					{"subHeader" in content && <h4>{content.subHeader}</h4>}
				</Header>
				{"htmlEditor" in content && (
					<Body
						dangerouslySetInnerHTML={{
							__html: sanitize(content.htmlEditor),
						}}
					/>
				)}
			</Section>
			<Divider />
			<Section>
				{"quote" in quote && (
					<Quote>
						<blockquote
							className="quote"
							dangerouslySetInnerHTML={{
								__html: sanitize(quote.quote),
							}}
						/>
					</Quote>
				)}
				{"author" in quote && <Author>{quote.author}</Author>}
				{"title" in quote && <AuthorTitle>{quote.title}</AuthorTitle>}
			</Section>
		</>
	)

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
