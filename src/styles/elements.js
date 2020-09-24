import styled from "styled-components";

export const CategoryButton = styled.button`
	background: none;
	border: 1px solid transparent;
	border-radius: 1em;
	color: ${props => props.theme.appGreen};
	font-size: 14px;
	font-weight: 300;
	margin: 4px;
	padding: 4px 16px;
	text-transform: uppercase;
	transition: background 300ms, border 100ms, color 300ms;
	white-space: nowrap;
	&:hover {
		cursor: pointer;
	}
`;
export const CategoryNav = styled.nav`
	display: flex;
	flex-wrap: wrap;
	/* horizonal spacing */
	justify-content: center;
`;
export const Content = styled.div`
	background: ${props => props.theme.background};
	min-height: 55%;
	width: 100%;
`;
export const ContentWrapper = styled.div`
	color: white;
	margin: 0 12px;
	max-width: 40rem;
	padding: 4em 0;
`;
export const ContentHeader = styled.div`
	margin-bottom: 24px;
	text-align: center;
	h3 {
		font-size: 30px;
		font-weight: 300;
	}
	h5 {
		color: ${props => props.theme.appGreen};
		font-family: ${props => props.theme.fontItalic};
		font-style: italic;
		font-size: 16px;
		font-weight: 300;
		letter-spacing: 0.03em;
		margin: 0;
	}
`;
export const ContentBody = styled.div`
	margin: 32px 0 24px;
	text-align: left;
	white-space: pre-wrap;
`;
export const Divider = styled.div`
	margin: 48px auto;
	height: 1px;
	width: 10%;
	background: ${props => props.theme.appGreen};
`;
export const MarginAuto = styled.div`
	margin: 0 auto;
	width: fit-content;
`;
export const Section = styled.section``;
