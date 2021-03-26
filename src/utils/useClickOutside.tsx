import { RefObject, useEffect } from "react"
// import store
import { useShopify } from "../store"

// ************
// hook
// ************

export default function useClickOutside(ref: RefObject<HTMLElement>): void {
	const { toggleCart } = useShopify()

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			console.log("ref:", ref)
			console.log("ref.current:", ref.current)
			console.log("event.target:", event.target)

			// TS cant assert.  Manually assert to event.target to node
			if (ref.current && !ref.current.contains(event.target as Node)) {
				toggleCart(false)
			}
		}

		// create event listener on mount
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			// remove event listener on unmount
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [ref])
}
