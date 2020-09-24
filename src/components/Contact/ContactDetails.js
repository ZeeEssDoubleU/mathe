import React from "react";
import styled from "styled-components";
// import components
import Icon from "../Icons/Icon";
import { ExternalLink } from "../elements/CustomLink";

// ************
// component
// ************

export const ContactDetails = (props) => {
	const { address, phone, email, facebook, instagram } = props.elem;
	return (
		<List>
			{address && (
				<li>
					<Icon className="social" name="location" />
					<ExternalLink address href={address} />
				</li>
			)}
			{phone && (
				<li>
					<Icon className="social" name="phone" />
					<ExternalLink phone href={phone} />
				</li>
			)}
			{email && (
				<li>
					<Icon className="social" name="email" />
					<ExternalLink email href={email} />
				</li>
			)}
			{facebook && (
				<li>
					<Icon className="social" name="facebook" />
					<ExternalLink facebook href={facebook} />
				</li>
			)}
			{instagram && (
				<li>
					<Icon className="social" name="instagram" />
					<ExternalLink instagram href={instagram} />
				</li>
			)}
		</List>
	);
};
ContactDetails.propTypes = {};

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
		.social {
			height: 20px;
			width: 20px;
			fill: white;
			transition: color 300ms;
		}
		a {
			color: ${(props) => props.theme.appGreen};
			font-size: 14px;
			font-weight: 400;
			text-decoration: none;
			transition: color 300ms;
		}
		&:hover {
			.social,
			a {
				color: white;
			}
		}
	}
`;
