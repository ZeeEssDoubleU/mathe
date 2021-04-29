import React, { ReactElement } from "react"
import { graphql } from "gatsby"
// import components
import Team from "../components/Pages/Team"
// import types
import { TeamPageQuery } from "../graphql/types"

// ************
// component
// ************

export default function TeamPage({
	data: { page },
}: {
	data: TeamPageQuery
}): ReactElement {
	return <Team {...page} />
}

// ************
// query
// ************

export const query = graphql`
	fragment Member on DatoCmsEmployee {
		id
		name
		bio
		picture {
			alt
			title
			gatsbyImageData(layout: FULL_WIDTH)
		}
	}
	query TeamPage {
		page: datoCmsPage(title: { eq: "Team" }) {
			header
			subHeader
			medallion {
				url
			}
			content {
				... on DatoCmsTeam {
					members {
						...Member
					}
				}
			}
		}
	}
`
