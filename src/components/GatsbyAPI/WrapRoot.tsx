import React, { ReactElement } from "react"
// import providers
import { ThemeProvider } from "styled-components"
import store from "../../store"
import { Provider } from "react-redux"
// import styles
import ResetStyle from "../../styles/reset"
import GlobalStyle from "../../styles/global"
import { theme } from "../../styles/theme"

// ************
// types
// ************

export interface WrapRoot_I {
	element: ReactElement | ReactElement[]
}

// ************
// component
// ************

export default function WrapRoot({ element }: WrapRoot_I): ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<ResetStyle />
				<GlobalStyle />
				{element}
			</Provider>
		</ThemeProvider>
	)
}
