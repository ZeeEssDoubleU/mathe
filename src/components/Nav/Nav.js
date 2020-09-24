import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
// import components
import NavMenu from "./NavMenu";

const Nav = (props) => {
	const { datoCmsLandingPage } = useStaticQuery(query);
	const { logo } = datoCmsLandingPage;

	return (
		<Container>
			<h1>
				<NavLogo src={logo.url} title={logo.title} alt={logo.alt} />
			</h1>
			<NavMenu />
		</Container>
	);
};
Nav.propTypes = {};
export default Nav;

// ************
// query
// ************

const query = graphql`
	{
		datoCmsLandingPage {
			logo {
				url
			}
		}
	}
`;

// ************
// styles
// ************

const Container = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 100%;
	background: hsla(0, 0%, 0%, 0.4);
`;
const NavLogo = styled.img`
	position: absolute;
	left: 50%;
	height: 48px;
	filter: drop-shadow(${(props) => props.theme.shadow});
	margin-top: 12px;
	transform: translateX(-50%);
	z-index: 99;
	@media (min-width: ${(props) => props.theme.tablet + "px"}),
		(min-height: ${(props) => props.theme.med + "px"}) {
		height: 64px;
	}
	@media (min-width: ${(props) =>
			props.theme.desktop + "px"}) and (min-height: ${(props) =>
			props.theme.med + "px"}) {
		height: 96px;
	}
`;
