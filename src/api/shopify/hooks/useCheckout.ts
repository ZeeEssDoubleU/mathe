import { useQueryClient } from "react-query"
import { shopifyClient } from "../graphql"
import { appendDataToCache } from "../helpers"
// import types / fragments
import {
	CheckoutQuery,
	CheckoutWithItemCountI,
	useCheckoutQuery,
} from "../graphql/types"
import { useShopify } from "../../../store"

// ************
// hook
// ************

export function useCheckout() {
	const { checkoutId } = useShopify()
	const queryClient = useQueryClient()

	// get checkout
	const {
		data: checkout,
		isLoading,
	} = useCheckoutQuery<CheckoutWithItemCountI>(
		shopifyClient,
		{ checkoutId },
		{
			enabled: !!checkoutId,
			queryKeyHashFn: () => `["checkout"]`,
			onSuccess: (data) => {
				const newData = data as CheckoutQuery
				const checkout = newData.node
				checkout ? appendDataToCache(queryClient, checkout) : newData
			},
		},
	)

	return {
		checkout,
		isLoading,
		totalItemCount: isLoading ? "?" : checkout?.totalItemCount,
		isCartEmpty: checkout?.lineItemCount === 0,
		lineItems: checkout?.lineItems,
	}
}
