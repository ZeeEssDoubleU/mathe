import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import sanitizeHtml from "sanitize-html"
// import types
import { DatoCmsCategoryFragment } from "../../../../graphql/types"
// import styles
import { CategoryButton, ContentBody } from "../../../../styles/elements"

// ************
// types
// ************

export interface ProductCategoryDescriptionI {
	description: DatoCmsCategoryFragment["description"]
}

// ************
// component
// ************

export default function ProductCategoryDescription({
	description,
}: ProductCategoryDescriptionI): ReactElement {
	// toggle button text
	const [expand, expand_set] = useState<boolean>(false)

	// DISPLAY category buttons (plural)
	return (
		<>
			<Body
				expand={expand}
				dangerouslySetInnerHTML={{
					__html: sanitizeHtml(description),
				}}
			/>
			<Expand
				onClick={() => expand_set(!expand)}
				className="category show-more"
				data-class="category show-more"
			>
				{expand === true ? "show less" : "show more"}
			</Expand>
		</>
	)
}

// ************
// styles
// ************

const Body = styled(ContentBody)<{ expand: boolean }>`
	max-height: ${(props) => (props.expand === false ? "9em" : "100%")};
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: height 0.2s;

	/* allows body to collapse with ellipsis at line break */
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${(props) => (props.expand === false ? 6 : null)};

	p {
		margin-bottom: 1.5rem;
	}
	p:last-child {
		margin-bottom: 0;
	}
`
const Expand = styled(CategoryButton)`
	margin: 18px 0 0 0;
	padding: 0;
	font-size: 12px;
`
