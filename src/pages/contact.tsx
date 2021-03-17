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
		page: Page_I
		sections: {
			nodes: {
				header: string
				contentSection: [
					{
						internal: { type: "DatoCmsSubHeader" }
						subHeader: string
					},
					{
						internal: { type: "DatoCmsContent" }
						content: string
					},
					{
						internal: { type: "DatoCmsContactInfo" }
						address: string
						phone: string
						email: string
						facebook: string
						instagram: string
					},
					{
						internal: { type: "DatoCmsForm" }
						form: string
					},
					{
						internal: { type: "DatoCmsDivider" }
						divider: string
					},
				]
			}[]
		}
	}
}

// ************
// component
// ************

export default function Contact({ data }: ContactQuery_I): ReactElement {
	const { sections, page } = data

	const contentSection: ReactElement[] = sections.nodes.map(
		(section, index1): ReactElement => (
			<Section key={index1}>
				<Header>
					<h3>{section.header}</h3>
					{section.contentSection.map(
						(elem, index2): ReactElement | null => {
							return "subHeader" in elem ? (
								<h5 key={index2}>{elem.subHeader}</h5>
							) : null
						},
					)}
				</Header>
				<Body>
					{section.contentSection.map(
						(elem, index3): ReactElement | null => {
							if ("content" in elem) {
								return (
									<div
										key={index3}
										dangerouslySetInnerHTML={{
											__html: sanitizeHtml(elem.content),
										}}
									/>
								)
							} else if ("address" in elem) {
								return <ContactDetails elem={elem} key={index3} />
							} else if ("form" in elem) {
								return <ContactForm key={index3} />
							} else if ("divider" in elem) {
								return <Divider key={index3} />
							} else {
								return null
							}
						},
					)}
				</Body>
			</Section>
		),
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
		page: datoCmsContactPage {
			header
			subHeader
			medallion {
				url
			}
		}
		sections: allDatoCmsContactPageSection {
			nodes {
				header
				contentSection {
					... on DatoCmsSubHeader {
						subHeader
						internal {
							type
						}
					}
					... on DatoCmsContent {
						content
						internal {
							type
						}
					}
					... on DatoCmsContactInfo {
						address
						email
						facebook
						instagram
						phone
						internal {
							type
						}
					}
					... on DatoCmsForm {
						form
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
				}
			}
		}
	}
`
