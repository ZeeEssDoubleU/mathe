import { gql } from "graphql-request"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { shopifyClient, addItemCountToCache } from "./index"
// import types / fragments
import { Checkout_I } from "shopify"
import { checkoutDetailsFragment } from "./queryFragments"

// ************
// types
// ************

export interface AddLineItems_I {
	checkoutId: string
	lineItemsToAdd: {
		variantId: string
		quantity: number
	}[]
}

export interface AddLineItemsCheckout_I {
	checkoutLineItemsAdd: {
		checkout: Checkout_I
	}
}

// ************
// hook
// ************

export function useAddLineItem(): UseMutationResult<
	Checkout_I,
	unknown,
	AddLineItems_I,
	unknown
> {
	const queryClient = useQueryClient()

	const queryString = gql`
		mutation checkoutLineItemsAdd(
			$checkoutId: ID!
			$lineItems: [CheckoutLineItemInput!]!
		) {
			checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
				checkout {
					...checkoutDetails
				}
			}
		}
		${checkoutDetailsFragment}
	`

	async function addLineItem({ checkoutId, lineItemsToAdd }: AddLineItems_I) {
		const {
			checkoutLineItemsAdd,
		}: AddLineItemsCheckout_I = await shopifyClient.request(
			queryString,
			// ! request variables
			{ checkoutId, lineItems: lineItemsToAdd },
		)
		return checkoutLineItemsAdd.checkout
	}

	return useMutation(addLineItem, {
		onSuccess: (data) => addItemCountToCache(queryClient, data),
	})
}
