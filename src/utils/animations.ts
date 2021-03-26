import { gsap } from "gsap"

// ************
// animations
// ************

// page transition animations
export function translateUp_set(targetElem: string): void {
	gsap.set(targetElem, { y: "-100%" })
}
export function translateDown_set(targetElem: string): void {
	gsap.set(targetElem, { y: 0 })
}

export function translateUp(targetElem: string, duration: number): void {
	gsap.fromTo(
		targetElem,
		{ y: 0 },
		{ y: "-100%", duration, ease: "power1.inOut" },
	)
}
export function translateDown(targetElem: string, duration: number): void {
	gsap.fromTo(
		targetElem,
		{ y: "-100%" },
		{ y: 0, duration, ease: "power1.inOut" },
	)
}

// background animations
export function bg_fadeIn(targetElem: string, duration: number): void {
	gsap.to(targetElem, { display: "block", duration: 0 })
	gsap.to(targetElem, { autoAlpha: 1, duration })
}
export function bg_fadeOut(targetElem: string, duration: number): void {
	gsap.to(targetElem, {
		display: "none",
		duration: 0,
		delay: duration,
	})
	gsap.to(targetElem, { autoAlpha: 0, duration })
}

// nav animataions
export function fadeIn_stagger(targetElem: string): void {
	gsap.from([targetElem], {
		opacity: 0,
		stagger: 0.3,
		duration: 1.5,
		delay: 0.3,
	})
}

// scroll animations
export function scroll_top(targetElem: HTMLElement | null): void {
	gsap.to(targetElem, { scrollTo: 0 })
}

// cart animations
export function slideIn(
	targetElem: string,
	distance: string,
	duration: number,
): void {
	gsap.fromTo(
		targetElem,
		{ x: distance },
		{ x: 0, duration, ease: "power1.inOut" },
	)
}
export function slideOut(
	targetElem: string,
	distance: string,
	duration: number,
): void {
	gsap.fromTo(
		targetElem,
		{ x: 0 },
		{ x: distance, duration, ease: "power1.inOut" },
	)
}
