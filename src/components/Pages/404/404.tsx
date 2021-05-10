import React, { ReactElement } from "react"
import styled from "styled-components"
import { sanitize } from "isomorphic-dompurify"
import { navigate } from "@reach/router"
import loadable from "@loadable/component"
// import components
import Main from "../../Layout/Main"
const Icon = loadable(() => import("../../Icon"))
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
} from "../../../styles/elements"
// import types
import { NotFoundPageQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function NotFound(
	props: NotFoundPageQuery["page"],
): ReactElement {
	const content = props.content[0]

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
							__html: sanitize(content.htmlEditor),
						}}
					/>
				</Body>
			</Section>
			<Divider />
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
