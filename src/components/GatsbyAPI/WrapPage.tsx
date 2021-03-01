import React, { ReactElement, ReactNode } from "react"
import { WrapPageElementBrowserArgs, PageProps } from "gatsby"
// import providers
import { StoreProvider } from "../../store/useStore"
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
	return (
		<StoreProvider {...props}>
			<Layout {...props}>{element}</Layout>
		</StoreProvider>
	)
}
