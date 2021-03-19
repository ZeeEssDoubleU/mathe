import styled from "styled-components"

export const CategoryButton = styled.button`
	background: none;
	border: 1px solid transparent;
	border-radius: 1em;
	color: ${({ theme }) => theme.appGreen};
	font-size: 14px;
	font-weight: ${({ theme }) => theme.fontMainWeight_Bold};
	margin: 4px;
	padding: 4px 16px;
	text-transform: uppercase;
	transition: background 300ms, border 100ms, color 300ms;
	white-space: nowrap;
	&:hover {
		cursor: pointer;
	}
`
export const CategoryNav = styled.nav`
	display: flex;
	flex-wrap: wrap;
	/* horizonal spacing */
	justify-content: center;
`
export const Content = styled.div`
	background: ${({ theme }) => theme.background};
	min-height: 55%;
	width: 100%;
`
export const ContentWrapper = styled.div`
	color: white;
	margin: 0 12px;
	max-width: 40rem;
	padding: 4em 0;
`
export const ContentHeader = styled.div`
	margin-bottom: 24px;
	text-align: center;
	h3 {
		font-size: 30px;
		font-weight: ${({ theme }) => theme.fontMainWeight_SectionHeader};
	}
	h5 {
		color: ${({ theme }) => theme.appGreen};
		font-family: ${({ theme }) => theme.fontAccent};
		font-style: italic;
		font-size: 16px;
		font-weight: ${({ theme }) => theme.fontAccentWeight};
		letter-spacing: 0.03em;
		margin: 0;
	}
`
export const ContentBody = styled.div`
	margin: 32px 0 24px;
	text-align: left;
	white-space: pre-wrap;
`
export const Divider = styled.div`
	margin: 48px auto;
	height: 1px;
	width: 10%;
	background: ${({ theme }) => theme.appGreen};
`
export const MarginAuto = styled.div`
	margin: 0 auto;
	width: fit-content;
`
export const ModalButton = styled(CategoryButton)`
	position: fixed;
	z-index: 99;
	right: 0;
	height: 3.5rem;
	width: 3.5rem;
	padding: 0.75rem;
	border-right: 0;
	border-radius: 1em 0 0 1em;
	margin-right: 0;
	background: ${({ theme }) => theme.background};
	fill: ${({ theme }) => theme.appGreen};

	&:hover {
		background: hsla(${({ theme }) => theme.appGreenPartial}, 0.5);
		border: 1px solid ${({ theme }) => theme.appGreen};
		border-right: 0;
		color: white;
		fill: white;
		cursor: pointer;
	}
`
export const Section = styled.section``
