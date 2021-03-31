import { RefObject, useEffect } from "react"
// import store
import { useShopify } from "../store"

// ************
// hook
// ************

export function useClickOutside(ref: RefObject<HTMLElement>): void {
	const { toggleCart } = useShopify()

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			// TS cant assert.  Manually assert to event.target to node
			if (
				ref.current && // ref not null
				event.target instanceof Node &&
				!ref.current.contains(event.target) // ref node contains target node
			) {
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
