import React, { ReactElement } from "react"
import styled from "styled-components"
import { sanitize } from "isomorphic-dompurify"
// import components
import ContactDetails from "./ContactDetails"
import ContactForm from "./ContactForm"
import Main from "../../Layout/Main"
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
} from "../../../styles/elements"
// import types
import { ContactPageQuery } from "../../../graphql/types"

// ************
// component
// ************

export default function Contact(props: ContactPageQuery["page"]): ReactElement {
	const contentSection: ReactElement[] = props.content.map(
		(section, index): ReactElement => {
			if ("divider" in section && section.divider) {
				return <Divider key={index} />
			} else {
				return (
					<Section key={index}>
						<Header>
							{"header" in section && <h3>{section.header}</h3>}
							{"subHeader" in section && <h4>{section.subHeader}</h4>}
						</Header>
						<Body>
							{"htmlEditor" in section && (
								<div
									key={index}
									dangerouslySetInnerHTML={{
										__html: sanitize(section.htmlEditor),
									}}
								/>
							)}
							{"address" in section && <ContactDetails {...section} />}
							{"form" in section && <ContactForm />}
						</Body>
					</Section>
				)
			}
		},
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
		margin-top: 16px;
	}
`
