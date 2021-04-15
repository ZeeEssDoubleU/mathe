import { QueryClient } from "react-query"
import {
	CheckoutDetailsFragment,
	CheckoutWithItemCountI,
} from "../graphql/types"
import { countItems } from "./countItems"

// add additional data to 'checkout' cache
export function appendDataToCache(
	queryClient: QueryClient,
	data: CheckoutDetailsFragment,
): CheckoutWithItemCountI {
	const { lineItemCount, totalItemCount } = countItems(data.lineItems.edges)

	return queryClient.setQueryData(["checkout"], {
		...data,
		lineItemCount,
		totalItemCount,
	})
}
