import React, { ReactElement } from "react"
import styled from "styled-components"
// import components
import Main from "../../Layout/Main"
// import styles
import { ContentHeader, ContentBody, Section } from "../../../styles/elements"
import { BlogPageQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function Blog(props: BlogPageQuery["page"]): ReactElement {
	const contentSection: ReactElement = (
		<Section>
			<Header>
				<h3>Coming soon</h3>
				<h4>{null}</h4>
			</Header>
			<Body>
				<p>
					Our blog is currently under construction and will be available
					soon.
				</p>
			</Body>
		</Section>
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

const Header = styled(ContentHeader)``
const Body = styled(ContentBody)`
	p {
		text-align: left;
		margin-top: 16px;
	}
`
