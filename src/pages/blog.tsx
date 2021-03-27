import React, { ReactElement } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
// import components
import Main from "../components/Layout/Main"
// import styles
import { ContentHeader, ContentBody, Section } from "../styles/elements"

// ************
// types
// ************

export interface BlogQuery_I {
	data: {
		page: {
			header: string
			subHeader: string
			medallion: {
				url: string
			}
			content: {
				__typename: "DatoCmsContentBlock"
				header: string
				subHeader: string
				htmlEditor: string
			}
		}
	}
}

// ************
// component
// ************

export default function Blog({ data }: BlogQuery_I): ReactElement {
	const { page } = data

	const contentSection: ReactElement = (
		<>
			<Section>
				<Header>
					<h3>Coming soon</h3>
					<h4>{null}</h4>
				</Header>
				<Body>
					<p>
						Our blog is currently under construction and will be available
						soon.
					</p>
				</Body>
			</Section>
		</>
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
		text-align: left;
		margin-top: 16px;
	}
`

// ************
// query
// ************

export const query = graphql`
	{
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
