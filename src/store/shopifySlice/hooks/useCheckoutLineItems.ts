import { useQueryClient } from "react-query"
import { appendDataToCache, shopifyClient } from "./index"
// import types / fragments
import {
	useCheckoutLineItemsAddMutation,
	useCheckoutLineItemsRemoveMutation,
	useCheckoutLineItemsUpdateMutation,
} from "../graphql/types"

// ************
// hook
// ************

export function useCheckoutLineItems() {
	const queryClient = useQueryClient()

	const addLineItem = useCheckoutLineItemsAddMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsAdd?.checkout
			checkout ? appendDataToCache(queryClient, checkout) : data
		},
	})

	const removeLineItem = useCheckoutLineItemsRemoveMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsRemove?.checkout
			checkout ? appendDataToCache(queryClient, checkout) : data
		},
	})

	const updateLineItem = useCheckoutLineItemsUpdateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsUpdate?.checkout
			checkout ? appendDataToCache(queryClient, checkout) : data
		},
	})

	return {
		addLineItem,
		removeLineItem,
		updateLineItem,
	}
}
