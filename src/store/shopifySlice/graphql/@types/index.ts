import { CheckoutDetailsFragment, CheckoutLineItem, MoneyV2 } from "./generated"

// ************
// types
// ************

export * from "./generated"

export interface CartItem_I {
	id: CheckoutLineItem["id"]
	title: CheckoutLineItem["title"]
	quantity: CheckoutLineItem["quantity"]
	price: MoneyV2["amount"]
}
export interface CheckoutWithItemCount_I extends CheckoutDetailsFragment {
	lineItemCount: number
	totalItemCount: number
}
