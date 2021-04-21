import { useQueryClient } from "react-query"
import { shopifyClient } from "../graphql"
import { appendDataToCache, usePersistCheckout } from ".."
// import store / types / fragments
import { useShopify } from "../../../redux"
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
	const persistCheckout = usePersistCheckout()

	// create checkout
	const createCheckout = useCheckoutCreateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutCreate?.checkout
			if (checkout) {
				appendDataToCache(queryClient, checkout)
				setCheckoutId(checkout.id) // ! set checkoutId state
				persistCheckout.set(checkout.id)
			}
		},
	})

	const addLineItem = useCheckoutLineItemsAddMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsAdd?.checkout
			if (checkout) {
				appendDataToCache(queryClient, checkout)
				persistCheckout.set(checkout.id)
			}
		},
	})

	const removeLineItem = useCheckoutLineItemsRemoveMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsRemove?.checkout
			if (checkout) {
				appendDataToCache(queryClient, checkout)
				persistCheckout.set(checkout.id)
			}
		},
	})

	const updateLineItem = useCheckoutLineItemsUpdateMutation(shopifyClient, {
		onSuccess: (data) => {
			const checkout = data.checkoutLineItemsUpdate?.checkout
			if (checkout) {
				appendDataToCache(queryClient, checkout)
				persistCheckout.set(checkout.id)
			}
		},
	})

	return {
		createCheckout,
		addLineItem,
		removeLineItem,
		updateLineItem,
	}
}
