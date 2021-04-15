import React, { ReactElement } from "react"
// import providers
import { ThemeProvider } from "styled-components"
import { Provider } from "react-redux"
import store from "../../store"
// import react-query
import {
	QueryClientProvider,
	queryClient,
	ReactQueryDevtools,
} from "../../api/reactQuery"
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

// component
export default function WrapRoot({ element }: WrapRoot_I): ReactElement {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<ResetStyle />
					<GlobalStyle />
					{element}
				</Provider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	)
}
