import { useQueryClient } from "react-query"
import { addItemCountToCache, shopifyClient } from "./index"
// import types / fragments
import { useCheckoutLineItemsAddMutation } from "../graphql/@types"

// ************
// hook
// ************

export function useAddLineItem() {
	const queryClient = useQueryClient()

	return useCheckoutLineItemsAddMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsAdd?.checkout
			checkout ? addItemCountToCache(queryClient, checkout) : data
		},
	})
}
