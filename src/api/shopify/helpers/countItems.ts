import { CheckoutDetailsFragment } from "../graphql/types"

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
