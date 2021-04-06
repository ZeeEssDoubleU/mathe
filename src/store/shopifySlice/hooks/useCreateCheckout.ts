import { useQueryClient } from "react-query"
import { addItemCountToCache, shopifyClient } from "./index"
// import types / fragments
import { useCheckoutCreateMutation } from "../graphql/@types"

// ************
// hook
// ************

// hook
export function useCreateCheckout() {
	const queryClient = useQueryClient()

	return useCheckoutCreateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutCreate?.checkout
			checkout ? addItemCountToCache(queryClient, checkout) : data
		},
	})
}
