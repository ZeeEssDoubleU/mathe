import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import Blog from "../components/Pages/Blog"
import { BlogPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function BlogPage({
	data: { page },
}: {
	data: BlogPageQuery
}): ReactElement {
	return <Blog {...page} />
}

// ************
// query
// ************

export const query = graphql`
	query BlogPage {
		page: datoCmsPage(title: { eq: "Blog" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsContentBlock {
					header
					subHeader
					htmlEditor
				}
			}
		}
	}
`
