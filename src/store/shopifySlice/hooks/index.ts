import { GraphQLClient } from "graphql-request"
import { QueryClient, useQueryClient, useQuery } from "react-query"
// import queries
import { useCreateCheckout } from "./useCreateCheckout"
import { useAddLineItem } from "./useAddLineItem"
import { useRemoveLineItem } from "./useRemoveLineItem"
import { useUpdateLineItem } from "./useUpdateLineItem"
// import types
import {
	CheckoutDetailsFragment,
	CheckoutWithItemCount_I,
} from "../graphql/@types"

// env vars
const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME
const storefrontToken = process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.GATSBY_SHOPIFY_API_VERSION

// shop details
const shopUrl = `${shopName}.myshopify.com`
const endpoint = `https://${shopUrl}/api/${apiVersion}/graphql.json`

// init shopify graphql client
export const shopifyClient = new GraphQLClient(endpoint)
shopifyClient.setHeaders({
	"X-Shopify-Storefront-Access-Token": storefrontToken,
	Accept: "application/json",
} as HeadersInit) // ! for TS warning

// ************
// helpers
// ************

// count line items
export function countItems(
	lineItems: CheckoutDetailsFragment["lineItems"]["edges"],
): {
	lineItemCount: number
	totalItemCount: number
} {
	// get item counts
	const lineItemCount = lineItems.length || 0
	const totalItemCount =
		lineItems.reduce((acc, { node }) => acc + node.quantity, 0) || 0

	return { lineItemCount, totalItemCount }
}

// add line item counts to 'checkout' cache
export function addItemCountToCache(
	queryClient: QueryClient,
	data: CheckoutDetailsFragment,
): CheckoutWithItemCount_I {
	// console.log("data", data) // ? debug
	const { lineItemCount, totalItemCount } = countItems(data.lineItems.edges)

	return queryClient.setQueryData("getCheckout", {
		...data,
		lineItemCount,
		totalItemCount,
	})
}

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useOperations() {
	const queryClient = useQueryClient()

	const { isLoading, data } = useQuery<CheckoutWithItemCount_I>("getCheckout")

	return {
		// queries
		queryClient,
		createCheckout: useCreateCheckout(),
		addLineItem: useAddLineItem(),
		removeLineItem: useRemoveLineItem(),
		updateLineItem: useUpdateLineItem(),
		checkout: data,
		totalItemCount: isLoading ? "?" : data?.totalItemCount,
		isCartEmpty: data?.lineItemCount === 0,
		lineItems: data?.lineItems,
	}
}
