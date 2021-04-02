import { gql } from "graphql-request"

// ************
// fragments
// ************

export const currencyFragment = gql`
	fragment currency on MoneyV2 {
		amount
		currencyCode
	}
`

export const lineItemDetailsFragment = gql`
	fragment lineItemDetails on CheckoutLineItem {
		id
		title

		quantity
		variant {
			id
			title
			currentlyNotInStock
			priceV2 {
				amount
				currencyCode
			}
		}
	}
`

export const checkoutDetailsFragment = gql`
	fragment checkoutDetails on Checkout {
		id
		webUrl
		createdAt
		updatedAt
		completedAt
		lineItems(first: 99) {
			edges {
				# line item
				node {
					...lineItemDetails
				}
			}
		}
		subtotalPriceV2 {
			...currency
		}
		totalTaxV2 {
			...currency
		}
		totalPriceV2 {
			...currency
		}
	}
	${lineItemDetailsFragment}
	${currencyFragment}
`
