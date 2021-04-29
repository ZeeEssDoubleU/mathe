import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import About from "../components/Pages/About"
// import types
import { AboutPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function AboutPage({
	data: { page },
}: {
	data: AboutPageQuery
}): ReactElement {
	return <About {...page} />
}

// ************
// query
// ************

export const query = graphql`
	query AboutPage {
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
