import { gsap } from "gsap"

// ************
// animations
// ************

// page transition animations
export const enter_top_set = (targetElem: string) =>
  gsap.set(targetElem, { y: 0 })

export const exit_top_set = (targetElem: string) =>
  gsap.set(targetElem, { y: "-100%" })

export const exit_top = (targetElem: string, duration: number) =>
  gsap.fromTo(
    targetElem,
    { y: 0 },
    { y: "-100%", duration, ease: "power1.inOut" }
  )

export const enter_top = (targetElem: string, duration: number) =>
  gsap.fromTo(
    targetElem,
    { y: "-100%" },
    { y: 0, duration, ease: "power1.inOut" }
  )

// background animations
export const anim_show = (targetElem: string, duration: number) => {
  gsap.to(targetElem, { display: "block", duration: 0 })
  gsap.to(targetElem, { autoAlpha: 1, duration })
}

export const anim_hide = (targetElem: string, duration: number) => {
  gsap.to(targetElem, {
    display: "none",
    duration: 0,
    delay: duration,
  })
  gsap.to(targetElem, { autoAlpha: 0, duration })
}

export const nav_fadeIn = () =>
  gsap.from([".nav-item"], {
    opacity: 0,
    stagger: 0.3,
    duration: 1.5,
    delay: 0.3,
  })

export const scroll_top = (targetElem: HTMLElement | null) =>
  gsap.to(targetElem, { scrollTo: 0 })
