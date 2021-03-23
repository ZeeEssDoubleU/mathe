import React, { ReactElement } from "react"
import { PageProps } from "gatsby"
// import components
import Layout from "../Layout/Layout"

// ************
// types
// ************

export interface WrapPage_I {
	element: ReactElement | ReactElement[]
	props: PageProps
}

// ************
// component
// ************

export default function WrapPage({ element, props }: WrapPage_I): ReactElement {
	return <Layout {...props}>{element}</Layout>
}
