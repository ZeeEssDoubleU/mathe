import { gql } from "graphql-request"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { shopifyClient, addItemCountToCache } from "./index"
// import types / fragments
import { Checkout_I } from "shopify"
import { checkoutDetailsFragment } from "./queryFragments"

// ************
// types
// ************

export interface CreateCheckout_I {
	checkoutCreate: {
		checkout: Checkout_I
	}
}

// ************
// hook
// ************

// hook
export function useCreateCheckout(): UseMutationResult<
	Checkout_I,
	unknown,
	void,
	unknown
> {
	const queryClient = useQueryClient()

	const queryString = gql`
		mutation checkoutCreate {
			checkoutCreate(input: {}) {
				checkout {
					...checkoutDetails
				}
			}
		}
		${checkoutDetailsFragment}
	`

	async function createCheckout() {
		const { checkoutCreate }: CreateCheckout_I = await shopifyClient.request(
			queryString,
		)
		return checkoutCreate.checkout
	}

	return useMutation(createCheckout, {
		// save to 'checkout' cache upon success
		onSuccess: (data) => addItemCountToCache(queryClient, data),
	})
}
