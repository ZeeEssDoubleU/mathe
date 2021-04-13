import { useQueryClient } from "react-query"
import { appendDataToCache, shopifyClient } from "./index"
// import store / types / fragments
import { useShopify } from "../.."
import {
	useCheckoutCreateMutation,
	useCheckoutLineItemsAddMutation,
	useCheckoutLineItemsRemoveMutation,
	useCheckoutLineItemsUpdateMutation,
} from "../graphql/types"

// ************
// hook
// ************

export function useCheckoutMutation() {
	const { setCheckoutId } = useShopify()
	const queryClient = useQueryClient()

	// create checkout
	const createCheckout = useCheckoutCreateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutCreate?.checkout
			checkout ? appendDataToCache(queryClient, checkout) : data
			checkout && setCheckoutId(checkout?.id) // ! set checkoutId state
		},
	})

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
		createCheckout,
		addLineItem,
		removeLineItem,
		updateLineItem,
	}
}
