import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import NotFound from "../components/Pages/404"
// import types
import { NotFoundPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function NotFoundPage({
	data: { page },
}: {
	data: NotFoundPageQuery
}): ReactElement {
	return <NotFound {...page} />
}

// ************
// query
// ************

export const query = graphql`
	query NotFoundPage {
		page: datoCmsPage(title: { eq: "404" }) {
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
