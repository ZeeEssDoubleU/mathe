import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import Success from "../components/Pages/Success"
// import types
import { SuccessPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function SuccessPage({
	data: { page },
}: {
	data: SuccessPageQuery
}): ReactElement {
	return <Success {...page} />
}

// ************
// query
// ************

export const query = graphql`
	query SuccessPage {
		page: datoCmsPage(title: { eq: "Success" }) {
			header
			subHeader
			content {
				... on DatoCmsContentBlock {
					header
					subHeader
					htmlEditor
				}
			}
			medallion {
				url
			}
		}
	}
`
