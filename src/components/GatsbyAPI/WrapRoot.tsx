import React, { ReactElement } from "react"
// import providers
import SCProvider from "../../styles/styled-components"
import ReactQueryProvider from "../../api/reactQuery"
import ReduxProvider from "../../redux"
// import styles
import ResetStyle from "../../styles/reset"
import GlobalStyle from "../../styles/global"
// import types
import { WrapElement_I } from "../../@types/custom"

// ************
// component
// ************

// component
export default function WrapRoot({ element }: WrapElement_I): ReactElement {
	return (
		<SCProvider>
			<ReactQueryProvider>
				<ReduxProvider>
					<ResetStyle />
					<GlobalStyle />
					{element}
				</ReduxProvider>
			</ReactQueryProvider>
		</SCProvider>
	)
}
