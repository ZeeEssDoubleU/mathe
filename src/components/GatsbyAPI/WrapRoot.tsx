import React, { ReactElement } from "react"
// import providers
import { ThemeProvider } from "styled-components"
import store from "../../store"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"
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

const clientQuery = new ClientQuery()

export default function WrapRoot({ element }: WrapRoot_I): ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={clientQuery}>
				<Provider store={store}>
					<ResetStyle />
					<GlobalStyle />
					{element}
				</Provider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
