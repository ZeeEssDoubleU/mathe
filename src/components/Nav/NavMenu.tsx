import React, { MouseEvent, ReactElement, useEffect, useRef } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
// import store
import { useTransition } from "../../store"

// ************
// component
// ************

export default function NavMenu(): ReactElement {
	const navRef = useRef<HTMLDivElement>(null)
	const cycleRef = useRef<HTMLHeadingElement>(null)
	const state_transition = useTransition()

	useEffect(() => {
		state_transition.nav_fadeIn()
	}, [])

	// tracks and handles nav animation.  No state used, so component is not re-rendered!  Score!
	function handleMouseMove(e: MouseEvent): void {
		const navElem = navRef?.current

		if (navElem) {
			const navWidth = navElem.offsetWidth
			const mouseX = e.clientX
			// set navShift based on how many extra navLinks carry off the page.
			// navShift sets the correct starting point for nav mouseMove effect
			// ex: if each navLink is 25vw and there's 2 extra, navShift should equal 50
			const navShift = 0

			const moveX: number = navShift * (mouseX / navWidth)

			navElem.style.transform = `translateX(${moveX}vw)`
		}
	}

	return (
		<Container ref={navRef} onMouseMove={handleMouseMove}>
			<Link
				to="/about"
				className="nav-link"
				onClick={state_transition.translateUp_page}
			>
				<div className="nav-item">
					<h1 className="nav-heading">About</h1>
					<h2 className="nav-subheading">What is Mathé?</h2>
				</div>
			</Link>
			<Link
				to="/products/yerba-mate"
				className="nav-link"
				onClick={state_transition.translateUp_page}
			>
				<div className="nav-item">
					<h1 className="nav-heading cycle" ref={cycleRef}>
						Shop
					</h1>
					<h2 className="nav-subheading">Premium teas + yerba mate</h2>
				</div>
			</Link>
			<Link
				to="/blog"
				className="nav-link"
				onClick={state_transition.translateUp_page}
			>
				<div className="nav-item">
					<h1 className="nav-heading">Blog</h1>
					<h2 className="nav-subheading">Our stories</h2>
				</div>
			</Link>
			<Link
				to="/contact"
				className="nav-link"
				onClick={state_transition.translateUp_page}
			>
				<div className="nav-item">
					<h1 className="nav-heading">Contact</h1>
					<h2 className="nav-subheading">Get in touch</h2>
				</div>
			</Link>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	/* moves up/down with PageTransition component */
	position: absolute;
	top: 20%;
	height: 80%;
	width: 100%;
	@media (min-width: ${({ theme }) => theme.media.tablet}) {
		top: 0;
		height: 100%;
		/* does not wrap nav elements down to next line */
		/* used for mouse hover/scroll effect */
		white-space: nowrap;
	}
	.nav-link {
		display: inline-block;
		height: 25%;
		width: 100%;
		@media (min-width: ${({ theme }) => theme.media.tablet}),
			(orientation: landscape) {
			height: 100%;
			width: 25vw;
		}
		.nav-item {
			display: grid;
			height: 100%;
			width: 100%;
			align-content: center;
			justify-content: center;
			justify-items: center;
			color: white;
			transition: background 200ms;
			h1 {
				font-size: 24px;
				font-weight: ${({ theme }) => theme.font.main_weight_nav};
				text-shadow: ${({ theme }) => theme.element.shadow};
				white-space: normal;
				@media (min-height: ${({ theme }) => theme.media.tall}) {
					font-size: 30px;
				}
				// min-width: desktop
				// min-height: tall
				@media (min-width: ${({ theme }) => theme.media.desktop}),
					(min-height: ${({ theme }) => theme.media.tall}) {
					font-size: 36px;
				}
				&.cycle {
					transition: opacity 500ms;
				}
			}
			h2 {
				transform: translateY(-2em);
				padding: 0.5em 1em;
				margin: 0.5em 0;
				border-radius: 1em;

				font-family: ${({ theme }) => theme.font.accent};
				font-size: 12px;
				font-style: italic;
				font-weight: ${({ theme }) => theme.font.accent_weight};
				letter-spacing: 0.6px;
				line-height: 1em;

				opacity: 0;
				background: hsla(${({ theme }) => theme.color.app_green_hsl}, 0.85);
				transition: transform 300ms ease-out, opacity 300ms ease-out;
				@media (min-width: ${({ theme }) => theme.media.tablet}) {
					font-size: 16px;
				}
			}
			&:hover {
				background: hsla(0, 0%, 0%, 0.5);
				cursor: pointer;
				h2 {
					transform: translateY(0);
					opacity: 1;
				}
			}
		}
	}
`
