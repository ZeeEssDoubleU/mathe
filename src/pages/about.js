import React from "react";
import styled from "styled-components";
import { useStaticQuery } from "gatsby";
// import components
import Main from "../components/Layout/Main";
// import styles
import {
	ContentHeader,
	ContentBody,
	Divider,
	Section,
} from "../styles/elements";

// ************
// component
// ************

const About = () => {
	const { page } = useStaticQuery(query);
	const content = page.content[0];
	const quote = page.content[1];

	const contentSection = (
		<>
			<Section>
				<Header>
					<h3>{content.header}</h3>
					<h5>{content.subHeader}</h5>
				</Header>
				<Body>{content.content}</Body>
			</Section>
			<Divider />
			<Section>
				<Quote>
					<blockquote className="quote">{quote.quote}</blockquote>
					<h3 className="author">{quote.author}</h3>
					<h5 className="title">{quote.title}</h5>
				</Quote>
			</Section>
		</>
	);

	return (
		<Main
			heroHeader={page.header}
			heroSubheader={page.subHeader}
			medallion={page.medallion}
			content={contentSection}
		/>
	);
};
About.propTypes = {};
export default About;

// ************
// styles
// ************

const Header = styled(ContentHeader)``;
const Body = styled(ContentBody)``;
const Quote = styled(ContentBody)`
	.quote {
		font-style: italic;
	}
	.author {
		font-size: 24px;
		font-weight: 300;
		text-align: right;
	}
	.title {
		margin: 0;
		text-align: right;
		font-family: ${(props) => props.theme.fontItalic};
		font-style: italic;
		font-size: 16px;
		font-weight: 300;
		letter-spacing: 0.03em;
		color: ${(props) => props.theme.appGreen};
	}
`;

// ************
// query
// ************

const query = graphql`
	{
		page: datoCmsAboutPage {
			header
			subHeader
			content {
				... on DatoCmsContentBlock {
					header
					subHeader
					content
				}
				... on DatoCmsQuote {
					quote
					author
					title
				}
			}
			medallion {
				url
			}
		}
	}
`;
