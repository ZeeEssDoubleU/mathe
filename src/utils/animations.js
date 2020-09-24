import { gsap } from "gsap"
import { useStore } from "../store/useStore"
import { useLayoutEffect, useRef } from "react"

export const enter_top_set = targetElem => gsap.set(targetElem, { y: 0 })

export const exit_top_set = targetElem => gsap.set(targetElem, { y: "-100%" })

export const exit_top = (targetElem, duration) =>
  gsap.fromTo(
    targetElem,
    { y: 0 },
    { y: "-100%", duration, ease: "power1.inOut" }
  )

export const enter_top = (targetElem, duration) =>
  gsap.fromTo(
    targetElem,
    { y: "-100%" },
    { y: 0, duration, ease: "power1.inOut" }
  )

export const anim_show = (targetElem, duration) => {
  gsap.to(targetElem, { display: "block", duration: 0 })
  gsap.to(targetElem, { autoAlpha: 1, duration })
}
export const anim_hide = (targetElem, duration) => {
  gsap.to(targetElem, { display: "none", duration: 0, delay: duration })
  gsap.to(targetElem, { autoAlpha: 0, duration })
}
