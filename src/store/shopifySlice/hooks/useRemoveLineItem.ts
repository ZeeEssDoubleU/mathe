import { useQueryClient } from "react-query"
import { addItemCountToCache, shopifyClient } from "./index"
// import types / fragments
import { useCheckoutLineItemsRemoveMutation } from "../graphql/@types"

// ************
// hook
// ************

export function useRemoveLineItem() {
	const queryClient = useQueryClient()

	return useCheckoutLineItemsRemoveMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsRemove?.checkout
			checkout ? addItemCountToCache(queryClient, checkout) : data
		},
	})
}
