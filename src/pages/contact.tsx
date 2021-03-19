import React, { ReactElement } from "react"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
import { graphql } from "gatsby"
import { Page_I } from "../@types/query"
// import components
import ContactDetails from "../components/Contact/ContactDetails"
import ContactForm from "../components/Contact/ContactForm"
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
export interface ContactQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			medallion: {
				url: string
			}
			content: [
				{
					internal: { type: "DatoCmsContactInfo" }
					header: string
					subHeader: string
					htmlEditor: string
					address: string
					phone: string
					email: string
					facebook: string
					instagram: string
				},
				{
					internal: { type: "DatoCmsDivider" }
					divider: boolean
				},
				{
					internal: { type: "DatoCmsForm" }
					header: string
					subHeader: string
					htmlEditor: string
					form: boolean
				},
			]
		}
	}
}

// ************
// component
// ************

export default function Contact({ data }: ContactQuery_I): ReactElement {
	const { page } = data

	const contentSection: ReactElement[] = page.content.map(
		(section, index): ReactElement => {
			if ("divider" in section && section.divider) {
				return <Divider key={index} />
			} else {
				return (
					<Section key={index}>
						<Header>
							{"header" in section && section.header && (
								<h3>{section.header}</h3>
							)}
							{"subHeader" in section && section.subHeader && (
								<h5>{section.subHeader}</h5>
							)}
						</Header>
						<Body>
							{"htmlEditor" in section && section.htmlEditor && (
								<div
									key={index}
									dangerouslySetInnerHTML={{
										__html: sanitizeHtml(section.htmlEditor),
									}}
								/>
							)}
							{"address" in section && section.address && (
								<ContactDetails elem={section} />
							)}
							{"form" in section && section.form && <ContactForm />}
						</Body>
					</Section>
				)
			}
		},
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
	p {
		margin-top: 16px;
	}
`

// ************
// query
// ************

export const query = graphql`
	{
		page: datoCmsPage(title: { eq: "Contact" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsContactInfo {
					header
					subHeader
					htmlEditor
					address
					phone
					email
					facebook
					instagram
					internal {
						type
					}
				}
				... on DatoCmsDivider {
					divider
					internal {
						type
					}
				}
				... on DatoCmsForm {
					header
					subHeader
					htmlEditor
					form
					internal {
						type
					}
				}
			}
		}
	}
`
