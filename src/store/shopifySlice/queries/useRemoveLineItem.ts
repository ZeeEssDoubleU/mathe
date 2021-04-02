import { gql } from "graphql-request"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { shopifyClient, addItemCountToCache } from "./index"
// import types / fragments
import { checkoutDetailsFragment } from "./queryFragments"
import { Checkout_I } from "shopify"

// ************
// types
// ************

export interface RemoveLineItems_I {
	checkoutId: string
	lineItemIds: string[]
}

export interface RemoveLineItemsCheckout_I {
	checkoutLineItemsRemove: {
		checkout: Checkout_I
	}
}

// ************
// hook
// ************

export function useRemoveLineItem(): UseMutationResult<
	Checkout_I,
	unknown,
	RemoveLineItems_I,
	unknown
> {
	const queryClient = useQueryClient()

	const queryString = gql`
		mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
			checkoutLineItemsRemove(
				checkoutId: $checkoutId
				lineItemIds: $lineItemIds
			) {
				checkout {
					...checkoutDetails
				}
			}
		}
		${checkoutDetailsFragment}
	`

	async function removeLineItem({
		checkoutId,
		lineItemIds,
	}: RemoveLineItems_I) {
		const {
			checkoutLineItemsRemove,
		}: RemoveLineItemsCheckout_I = await shopifyClient.request(
			queryString,
			// ! request variables
			{ checkoutId, lineItemIds },
		)
		return checkoutLineItemsRemove.checkout
	}

	return useMutation(removeLineItem, {
		onSuccess: (data) => addItemCountToCache(queryClient, data),
	})
}
