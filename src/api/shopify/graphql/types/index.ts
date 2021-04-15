import { CheckoutDetailsFragment, CheckoutLineItem, MoneyV2 } from "./generated"

// ************
// types
// ************

export * from "./generated"

export interface CartItemI {
	id: CheckoutLineItem["id"]
	title: CheckoutLineItem["title"]
	quantity: CheckoutLineItem["quantity"]
	price: MoneyV2["amount"]
}
export interface CheckoutWithItemCountI extends CheckoutDetailsFragment {
	lineItemCount: number
	totalItemCount: number
}
