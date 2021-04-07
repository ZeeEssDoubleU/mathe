import React, { forwardRef, memo, ReactChild, ReactElement } from "react"
import styled from "styled-components"
import SVG from "react-inlinesvg"
// import components
import BackButton from "../elements/BackButton"

// ************
// types
// ************

export interface Hero_I {
	children?: ReactChild
	header?: string
	subHeader?: string
	medallion: {
		url: string
	}
}

// ************
// component
// ************

const Hero = forwardRef<HTMLElement, Hero_I>(
	(props, forwardedRef): ReactElement => (
		<Container ref={forwardedRef}>
			<BackButton />
			<Headers>
				{props.subHeader && <SubHeader>{props.subHeader}</SubHeader>}
				{props.header && <Header>{props.header}</Header>}
			</Headers>
			<Medallion>
				{props.medallion && <SVG src={props.medallion.url} />}
			</Medallion>
		</Container>
	),
)
export default memo(Hero)

// ************
// styles
// ************

const Container = styled.header`
	position: relative;
	height: 100%;
	width: 100%;
	text-align: center;
	@media (min-height: ${({ theme }) => theme.media.short}) {
		height: 75%;
	}
	@media (min-height: ${({ theme }) => theme.media.med}) {
		height: 45%;
	}
`
const Headers = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 80%;
	color: white;
	transform: translateX(-50%) translateY(-50%);
`
const Header = styled.h1`
	font-size: 24px;
	font-weight: ${({ theme }) => theme.font.main_weight_header};
	text-shadow: ${({ theme }) => theme.element.shadow};
	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		font-size: 32px;
	}
	@media (min-width: ${({ theme }) => theme.media.desktop}) {
		font-size: 48px;
	}
`
const SubHeader = styled.h1`
	display: inline-block;
	padding: 0.25em 1em;
	margin: 0.75em 0;
	border-radius: 1em;

	background: hsla(${({ theme }) => theme.color.app_green_hsl}, 0.85);
	font-size: 16px;
	font-weight: ${({ theme }) => theme.font.main_weight_subheader};
	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		font-size: 20px;
	}
`
const Medallion = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%) translateY(50%);
	height: 64px;
	width: 64px;

	display: grid;
	align-content: center;
	justify-content: center;

	border: none;
	border-radius: 50%;
	background: ${({ theme }) => theme.color.app_green};

	svg {
		height: 30px;
		width: 30px;

		fill: white;
	}
`
