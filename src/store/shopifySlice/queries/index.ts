import { GraphQLClient } from "graphql-request"
import { QueryClient, useQueryClient, useQuery } from "react-query"
import { CheckoutWithItemCount_I, Checkout_I, LineItems_I } from "shopify"

// import queries
import { useCreateCheckout } from "./useCreateCheckout"
import { useAddLineItem } from "./useAddLineItem"
import { useRemoveLineItem } from "./useRemoveLineItem"
import { useUpdateLineItem } from "./useUpdateLineItem"

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
	lineItems: LineItems_I,
): {
	lineItemCount: number
	totalItemCount: number
} {
	// get item counts
	const lineItemCount = lineItems.edges?.length || 0
	const totalItemCount =
		lineItems.edges?.reduce((acc, { node }) => acc + node.quantity, 0) || 0

	return { lineItemCount, totalItemCount }
}

// add line item counts to 'checkout' cache
export function addItemCountToCache(
	queryClient: QueryClient,
	data: Checkout_I,
): CheckoutWithItemCount_I {
	const { lineItemCount, totalItemCount } = countItems(data.lineItems)

	return queryClient.setQueryData("checkout", {
		...data,
		lineItemCount,
		totalItemCount,
	})
}

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useShopifyQueries() {
	const queryClient = useQueryClient()
	const { isLoading, isError, data, error } = useQuery<
		CheckoutWithItemCount_I,
		Error
	>("checkout")

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
