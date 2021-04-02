// ************
// types
// ************

declare module "shopify" {
	export interface Money_I {
		amount: string
		currencyCode: string
	}

	export interface LineItem_I {
		id: string
		title: string
		quantity: number
		variant: {
			id: string
			title: string
			currentlyNotInStock: boolean
			priceV2: Money_I
		}
	}

	export interface LineItems_I {
		edges: {
			node: LineItem_I
		}[]
	}

	export interface CartItem_I {
		id: LineItem_I["id"]
		title: LineItem_I["title"]
		quantity: LineItem_I["quantity"]
		price: Money_I["amount"]
	}

	export interface Checkout_I {
		id: string
		webUrl: string
		createdAt: string
		updatedAt: string
		completedAt: string
		lineItems: LineItems_I
		subtotalPriceV2: Money_I
		totalTaxV2: Money_I
		totalPriceV2: Money_I
	}

	export interface CheckoutWithItemCount_I extends Checkout_I {
		lineItemCount: number
		totalItemCount: number
	}
}
