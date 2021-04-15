import { QueryClient } from "react-query"
// import experimentals
// TODO: lock react-query to patch version until these are non-experimental
import { broadcastQueryClient } from "react-query/broadcastQueryClient-experimental"

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
// exports
// ************

export { QueryClient, QueryClientProvider } from "react-query"
export { ReactQueryDevtools } from "react-query/devtools"
