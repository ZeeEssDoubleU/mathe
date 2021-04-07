import { useState } from "react"
import { useQueryClient } from "react-query"
import { appendDataToCache, shopifyClient } from "./index"
// import types / fragments
import {
	CheckoutQuery,
	CheckoutWithItemCount_I,
	useCheckoutCreateMutation,
	useCheckoutQuery,
} from "../graphql/types"

// ************
// hook
// ************

export function useCheckout() {
	const [checkoutId, setCheckoutId] = useState<string>("")
	const queryClient = useQueryClient()

	// create checkout
	const createCheckout = useCheckoutCreateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutCreate?.checkout
			checkout ? appendDataToCache(queryClient, checkout) : data
			checkout && setCheckoutId(checkout?.id) // ! set checkoutId state
		},
	})

	// get checkout
	const {
		data: checkout,
		isLoading,
	} = useCheckoutQuery<CheckoutWithItemCount_I>(
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
		createCheckout,
	}
}
