import { GraphQLClient } from "graphql-request"
import { QueryClient } from "react-query"
// import types
import {
	CheckoutDetailsFragment,
	CheckoutWithItemCount_I,
} from "../graphql/types"
// import hooks
import { useCheckout } from "./useCheckout"
import { useCheckoutLineItems } from "./useCheckoutLineItems"

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

// add additional data to 'checkout' cache
export function appendDataToCache(
	queryClient: QueryClient,
	data: CheckoutDetailsFragment,
): CheckoutWithItemCount_I {
	const { lineItemCount, totalItemCount } = countItems(data.lineItems.edges)

	return queryClient.setQueryData(["checkout"], {
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
	const { checkout, isLoading, createCheckout } = useCheckout()
	const {
		addLineItem,
		removeLineItem,
		updateLineItem,
	} = useCheckoutLineItems()

	return {
		// queries
		checkout,
		createCheckout,
		addLineItem,
		removeLineItem,
		updateLineItem,
		totalItemCount: isLoading ? "?" : checkout?.totalItemCount,
		isCartEmpty: checkout?.lineItemCount === 0,
		lineItems: checkout?.lineItems,
	}
}
