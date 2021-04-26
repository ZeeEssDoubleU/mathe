// import { RefObject, useEffect } from "react"
// import "intersection-observer"

// // ************
// // types
// // ************

// export interface IO_I {
//   dispatch: () => void
//   isDesktop: boolean
//   target: RefObject<HTMLElement>
//   onToggleNav: (dispatch: () => void, isIntersecting: boolean) => void
// }

// // ************
// // hook
// // ************

// export const useIntersectionObserver = ({
//   dispatch,
//   isDesktop,
//   target,
//   onToggleNav,
// }: IO_I): void => {
//   useEffect(() => {
//     // mount
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         // function dispatches to reducer in useStore.js
//         if (!isDesktop) {
//           onToggleNav(dispatch, !entry.isIntersecting)
//         }
//       },
//       { rootMargin: "-100px" }
//     )

//     if (target.current) {
//       io.observe(target.current)
//     }

//     // unmount
//     return () => io.disconnect()
//   }, [dispatch, isDesktop, target, onToggleNav])
// }
