import React, { ReactElement } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { navigate } from "@reach/router"
// import store
import { useTransition } from "../../redux"

// ************
// types
// ************

export interface BackVars_I {
	layerHeight: number
	buttonWidth: number
	buttonHeight: number
	layerRadius: number
}

// ************
// component
// ************

function BackButton(): ReactElement {
	const state_transition = useTransition()

	return (
		<Link
			to="/"
			aria-label="close page / back to home"
			onClick={(e) => {
				e.preventDefault() // stop immediate navigation
				state_transition.translateDown_page()
				setTimeout(() => {
					navigate("/")
					// multiply by 1000 for setTimeout to convert store's state_transition.duration_page_s correctly
				}, state_transition.duration_page_ms)
			}}
		>
			<Container>
				<Inner>
					{/* bars of arrow or X */}
					<div className="shape left" />
					<div className="shape right" />
				</Inner>
			</Container>
		</Link>
	)
}
export default React.memo(BackButton)

// ************
// styles
// ************

// variables for quick customization of hamburger
const backVars: BackVars_I = {
	layerHeight: 2,
	buttonWidth: 50,
	buttonHeight: 50,
	layerRadius: 4,
}
const Container = styled.button`
	padding: 0;
	background: none;
	border: none;
	cursor: pointer;
	margin-top: 12px;
`
// sizing of button
// TODO: check if backVars props implemented properly
const Inner = styled.div`
	position: relative;
	width: ${backVars.buttonWidth * 0.75}px;
	height: ${backVars.buttonHeight * 0.75}px;
	filter: drop-shadow(${({ theme }) => theme.element.shadow});
	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		width: ${backVars.buttonWidth}px;
		height: ${backVars.buttonHeight}px;
	}
	/* shape of each bar (arrow or X) */
	.shape {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: ${backVars.layerHeight}px;
		background: white;
		height: ${backVars.layerHeight * 0.75}px;
		border-radius: ${backVars.layerRadius * 0.75}px;
		@media (min-width: ${({ theme }) => theme.media.tablet}) {
			border: none;
			border-radius: ${backVars.layerRadius}px;
		}
	}
	.left {
		transform: translateY(-50%) rotate(45deg);
		transition: transform 0.3s;
	}
	.right {
		transform: translateY(-50%) rotate(-45deg);
		transition: transform 0.3s;
	}
	// TODO: fix hover anim
	&:hover {
		.left {
			transform: translateY(-50%) translateX(33%) rotate(45deg);
		}
		.right {
			transform: translateY(-50%) translateX(-33%) rotate(-45deg);
		}
	}
`
