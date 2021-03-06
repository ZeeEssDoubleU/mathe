import React, { ReactElement } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
// import components
const Icon = loadable(() => import("../../Icon"))
import ExternalLink from "../../elements/CustomLink"
import { ContactInfoFragment } from "../../../graphql/types"

// ************
// component
// ************

export default function ContactDetails({
	address,
	phone,
	email,
	facebook,
	instagram,
}: ContactInfoFragment): ReactElement {
	return (
		<List>
			{address && (
				<li className="social">
					<Icon name="location" />
					<ExternalLink address href={address} />
				</li>
			)}
			{phone && (
				<li className="social">
					<Icon name="phone" />
					<ExternalLink phone href={phone} />
				</li>
			)}
			{email && (
				<li className="social">
					<Icon name="email" />
					<ExternalLink email href={email} />
				</li>
			)}
			{facebook && (
				<li className="social">
					<Icon name="facebook" />
					<ExternalLink facebook href={facebook} />
				</li>
			)}
			{instagram && (
				<li className="social">
					<Icon name="instagram" />
					<ExternalLink instagram href={instagram} />
				</li>
			)}
		</List>
	)
}

// ************
// styles
// ************

const List = styled.ul`
	padding: 0;
	margin: 24px auto !important;
	width: fit-content;
	li {
		display: grid;
		grid-column-gap: 4px;
		grid-template-columns: 24px auto;
		margin: 8px 0;
		text-align: left;
		white-space: pre-wrap;
		svg {
			height: 20px;
			/* width: 20px; */
			fill: white;
			transition: color 300ms;
		}
		a {
			color: ${({ theme }) => theme.color.app_green};
			font-size: 14px;
			font-weight: ${({ theme }) => theme.font.main_weight_link};
			text-decoration: none;
			transition: color 300ms;
		}
		&:hover {
			svg,
			a {
				color: white;
			}
		}
	}
`
