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
import { useCheckoutMutation } from "./useCheckoutMutation"

// ************
// hook
// ************

export function useCheckout() {
	const queryClient = useQueryClient()
	const shopifyState = useShopify()
	const shopifyCheckoutMutation = useCheckoutMutation()

	// get checkout
	const {
		data: checkout,
		isLoading,
	} = useCheckoutQuery<CheckoutWithItemCountI>(
		shopifyClient,
		{ checkoutId: shopifyState.checkoutId },
		{
			enabled: !!shopifyState.checkoutId,
			queryKeyHashFn: () => `["checkout"]`,
			onSuccess: (data) => {
				const newData = data as CheckoutQuery
				const checkout = newData.node
				if (checkout) {
					// if checkout already completed, create new checkout
					checkout.completedAt
						? shopifyCheckoutMutation.createCheckout.mutate({})
						: appendDataToCache(queryClient, checkout)
				}
			},
			onError: () => {
				// if checkout not found, create new checkout
				shopifyCheckoutMutation.createCheckout.mutate({})
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
