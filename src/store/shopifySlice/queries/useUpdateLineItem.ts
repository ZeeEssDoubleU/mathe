import { gql } from "graphql-request"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { shopifyClient, addItemCountToCache } from "./index"
// import types / fragments
import { Checkout_I } from "shopify"
import { checkoutDetailsFragment } from "./queryFragments"

// ************
// types
// ************

export interface UpdateLineItems_I {
	checkoutId: string
	lineItems: {
		id: string
		quantity: number
	}[]
}

export interface UpdateLineItemsCheckout_I {
	checkoutLineItemsUpdate: {
		checkout: Checkout_I
	}
}

// ************
// hook
// ************

export function useUpdateLineItem(): UseMutationResult<
	Checkout_I,
	unknown,
	UpdateLineItems_I,
	unknown
> {
	const queryClient = useQueryClient()

	const queryString = gql`
		mutation checkoutLineItemsUpdate(
			$checkoutId: ID!
			$lineItems: [CheckoutLineItemUpdateInput!]!
		) {
			checkoutLineItemsUpdate(
				checkoutId: $checkoutId
				lineItems: $lineItems
			) {
				checkout {
					...checkoutDetails
				}
			}
		}
		${checkoutDetailsFragment}
	`

	async function updateLineItem({ checkoutId, lineItems }: UpdateLineItems_I) {
		const {
			checkoutLineItemsUpdate,
		}: UpdateLineItemsCheckout_I = await shopifyClient.request(
			queryString,
			// ! request variables
			{ checkoutId, lineItems },
		)
		return checkoutLineItemsUpdate.checkout
	}

	return useMutation(updateLineItem, {
		onSuccess: (data) => addItemCountToCache(queryClient, data),
	})
}
