import { useQueryClient } from "react-query"
import { addItemCountToCache, shopifyClient } from "./index"
// import types / fragments
import { useCheckoutLineItemsUpdateMutation } from "../graphql/@types"

// ************
// hook
// ************

export function useUpdateLineItem() {
	const queryClient = useQueryClient()

	return useCheckoutLineItemsUpdateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsUpdate?.checkout
			checkout ? addItemCountToCache(queryClient, checkout) : data
		},
	})
}
