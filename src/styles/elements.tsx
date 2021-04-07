import styled from "styled-components"

export const CategoryButton = styled.button`
	padding: 4px 16px;
	margin: 4px;
	border: 1px solid transparent;
	border-radius: 1em;

	background: none;
	color: ${({ theme }) => theme.color.app_green};
	font-size: 14px;
	font-weight: ${({ theme }) => theme.font.main_weight_bold};
	white-space: nowrap;
	text-transform: uppercase;
	transition: background 300ms, border 100ms, color 300ms;
	&:hover {
		cursor: pointer;
	}
`

export const CategoryNav = styled.nav`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`

export const Content = styled.div`
	background: ${({ theme }) => theme.color.background};
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
		font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
	}
	h4 {
		margin: 0;
		color: ${({ theme }) => theme.color.app_green};
		font-family: ${({ theme }) => theme.font.accent};
		font-style: italic;
		font-size: 16px;
		font-weight: ${({ theme }) => theme.font.accent_weight};
		letter-spacing: 0.03em;
	}
`

export const ContentTitle = styled.h3`
	font-size: 30px;
	font-weight: ${({ theme }) => theme.font.main_weight_sectionHeader};
`

export const ContentSubtitle = styled.h5`
	margin: 0;
	color: ${({ theme }) => theme.color.app_green};
	font-family: ${({ theme }) => theme.font.accent};
	font-style: italic;
	font-size: 16px;
	font-weight: ${({ theme }) => theme.font.accent_weight};
	letter-spacing: 0.03em;
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
	background: ${({ theme }) => theme.color.app_green};
`

export const MarginAuto = styled.div`
	margin: 0 auto;
	width: fit-content;
`

export const ModalButton = styled(CategoryButton)`
	position: fixed;
	z-index: ${({ theme }) => theme.zIndex.mid};
	right: 0;
	height: 3.5rem;
	width: 3.5rem;
	padding: 12px;
	margin-right: 0;
	border-right: 0;
	border-radius: 1em 0 0 1em;

	background: ${({ theme }) => theme.color.background};
	fill: ${({ theme }) => theme.color.app_green};

	&:hover {
		background: ${({ theme }) => theme.color.hover_bg};
		border: 1px solid ${({ theme }) => theme.color.app_green};
		border-right: 0;
		color: white;
		fill: white;
		cursor: pointer;
	}
`

export const Section = styled.section``
