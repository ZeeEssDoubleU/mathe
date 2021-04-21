import { ReactElement } from "react"
import { PageProps } from "gatsby"

// ************
// types
// ************

export interface WrapElement_I {
	element: ReactElement
}

export interface WrapElementWithProps_I {
	element: ReactElement
	props: PageProps
}

export interface Provider_I {
	children: ReactElement | ReactElement[]
}
