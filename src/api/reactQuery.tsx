import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
// import experimentals
// TODO: lock react-query to patch version until these are non-experimental
import { broadcastQueryClient } from "react-query/broadcastQueryClient-experimental"
import { Provider_I } from "../@types"

// ************
// init
// ************

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
})
broadcastQueryClient({ queryClient, broadcastChannel: "mathe-tea-queries" })

// ************
// provider
// ************

export default function ReactQueryProvider({ children }: Provider_I) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

// ************
// exports
// ************
