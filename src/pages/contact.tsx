import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import Contact from "../components/Pages/Contact"
// import types
import { ContactPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function ContactPage({
	data: { page },
}: {
	data: ContactPageQuery
}): ReactElement {
	return <Contact {...page} />
}

// ************
// query
// ************

export const query = graphql`
	fragment ContactInfo on DatoCmsContactInfo {
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
	fragment ContactForm on DatoCmsForm {
		header
		subHeader
		htmlEditor
		form
		internal {
			type
		}
	}
	query ContactPage {
		page: datoCmsPage(title: { eq: "Contact" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsContactInfo {
					...ContactInfo
				}
				... on DatoCmsDivider {
					divider
					internal {
						type
					}
				}
				... on DatoCmsForm {
					...ContactForm
				}
			}
		}
	}
`
