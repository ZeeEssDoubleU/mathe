import React, { ReactElement } from "react"
import { ReactQueryDevtools } from "react-query/devtools"
// import providers
import { ThemeProvider } from "styled-components"
import { Provider } from "react-redux"
import store from "../../store"
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

// init query client
export const clientQuery = new QueryClient()

// component
export default function WrapRoot({ element }: WrapRoot_I): ReactElement {
	return (
		<>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={clientQuery}>
					<Provider store={store}>
						<ResetStyle />
						<GlobalStyle />
						{element}
					</Provider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	)
}
