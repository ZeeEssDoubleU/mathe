import React, { ReactElement, useEffect } from "react"
// import components
import SEO from "../components/elements/SEO"

// ************
// component
// ************

export default function App(): ReactElement {
	// let the document know when mouse is being used
	useEffect(() => {
		document.body.addEventListener("mousedown", () => {
			document.body.classList.add("using-mouse")
		})
		document.body.addEventListener("keydown", () => {
			document.body.classList.remove("using-mouse")
		})
	}, [])

	return <SEO />
}
