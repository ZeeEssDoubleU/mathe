import React, { MouseEvent, ReactElement, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "gatsby"
// import store
import { useAnimation } from "../../redux"

// ************
// component
// ************

export default function NavMenu(): ReactElement {
	const navRef = useRef<HTMLDivElement>(null)
	const state_animation = useAnimation()

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
			<NavLink
				to="/about"
				className="nav-link"
				onClick={() => state_animation.setTranslate_page("up")}
			>
				<NavItem order={0}>
					<h1 className="nav-heading">About</h1>
					<h2 className="nav-subheading">What is Mathé?</h2>
				</NavItem>
			</NavLink>
			<NavLink
				to="/products/yerba-mate"
				className="nav-link"
				onClick={() => state_animation.setTranslate_page("up")}
			>
				<NavItem order={1}>
					<h1 className="nav-heading">Shop</h1>
					<h2 className="nav-subheading">Premium teas + yerba mate</h2>
				</NavItem>
			</NavLink>
			<NavLink
				to="/blog"
				className="nav-link"
				onClick={() => state_animation.setTranslate_page("up")}
			>
				<NavItem order={2}>
					<h1 className="nav-heading">Blog</h1>
					<h2 className="nav-subheading">Our stories</h2>
				</NavItem>
			</NavLink>
			<NavLink
				to="/contact"
				className="nav-link"
				onClick={() => state_animation.setTranslate_page("up")}
			>
				<NavItem order={3}>
					<h1 className="nav-heading">Contact</h1>
					<h2 className="nav-subheading">Get in touch</h2>
				</NavItem>
			</NavLink>
		</Container>
	)
}

// ************
// styles
// ************

const Container = styled.div`
	/* moves up/down with PageAnimation component */
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
`
const fadeInAnim = keyframes`
	from { opacity: 0 }
	to {opacity: 1 }
`
const FadeInStagger = styled.div<{ order: number }>`
	animation-name: ${fadeInAnim};
	animation-delay: ${({ order }) => `calc(${order} * 300ms)`};
	animation-duration: 1500ms;
	animation-fill-mode: both;
`
const NavLink = styled(Link)`
	display: inline-block;
	height: 25%;
	width: 100%;
	@media (min-width: ${({ theme }) => theme.media.tablet}),
		(orientation: landscape) {
		height: 100%;
		width: 25vw;
	}
`
const NavItem = styled(FadeInStagger)`
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
`
