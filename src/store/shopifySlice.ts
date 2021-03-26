import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import shopify client
import Client, { Cart, LineItem } from "shopify-buy"

const client = Client.buildClient({
	storefrontAccessToken: `${process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
	domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
})

// ************
// types
// ************

// ! shopify-buy Cart interface is INCORRECTLY typed
// TODO: shopify-buy types should eventually be fixed
export interface LineItem_I {
	id: LineItem["id"]
	title: LineItem["title"]
	quantity: LineItem["quantity"]
	variant: {
		price: LineItem["price"]
	}
}
export interface Cart_I {
	id: Cart["id"]
	webUrl: Cart["checkoutUrl"]
	lineItems: LineItem_I[]
	subtotalPrice: Cart["subtotalPrice"]
	totalPrice?: string
	totalTax?: string
}
export interface ShopifyState_I {
	isCartOpen: boolean
	lineItemCount: number
	totalItemCount: number
	checkout: Cart_I
	lineItems_optimistic: LineItem_I[]
}
export interface AddLineItems_I {
	checkoutId: string | number
	lineItemsToAdd: {
		variantId: string | number
		quantity: number
	}[]
}
export interface UpdateLineItems_I {
	checkoutId: string | number
	lineItems: {
		id: string | number // change in id key
		quantity: number
	}[]
}
export interface RemoveLineItems_I {
	checkoutId: string | number
	lineItemIds: string[]
}

// ************
// init state
// ************

const initialState: ShopifyState_I = {
	isCartOpen: false,
	lineItemCount: 0,
	totalItemCount: 0,
	checkout: {} as Cart_I,
	// TODO: implement in the future
	lineItems_optimistic: [],
}

// ************
// slice
// ************

export function countItems(
	state: ShopifyState_I,
	lineItems: LineItem_I[],
): void {
	state.lineItemCount = lineItems?.length || 0
	state.totalItemCount =
		lineItems?.reduce((acc, item) => acc + item.quantity, 0) || 0
}

export const shopifySlice = createSlice({
	name: "shopify",
	initialState,
	reducers: {
		toggleCart: (state, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload
		},
		createCheckout: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		addLineItem: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		updateLineItem: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		removeLineItem: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		addLineItem_optimistic: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		updateLineItem_optimistic: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
		removeLineItem_optimistic: (state, action: PayloadAction<Cart_I>) => {
			state.checkout = action.payload
			countItems(state, action.payload.lineItems)
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useShopify() {
	const dispatch = useAppDispatch()

	const {
		toggleCart,
		createCheckout,
		addLineItem,
		updateLineItem,
		removeLineItem,
	} = shopifySlice.actions

	// ***shopify async functions
	async function asyncCreateCheckout() {
		try {
			const response: unknown = await client.checkout.create()
			// serialized to prevent dispatch error
			const serializedResponse: Cart_I = JSON.parse(JSON.stringify(response))
			dispatch(createCheckout(serializedResponse))
		} catch (error) {
			console.error(error)
		}
	}

	async function asyncAddLineItem(action: AddLineItems_I) {
		try {
			const response: unknown = await client.checkout.addLineItems(
				action.checkoutId,
				action.lineItemsToAdd,
			)
			// serialized to prevent dispatch error
			const serializedResponse: Cart_I = JSON.parse(JSON.stringify(response))
			dispatch(addLineItem(serializedResponse))
		} catch (error) {
			console.error(error)
		}
	}

	async function asyncUpdateLineItem(action: UpdateLineItems_I) {
		try {
			const response: unknown = await client.checkout.updateLineItems(
				action.checkoutId,
				action.lineItems,
			)
			// serialized to prevent dispatch error
			const serializedResponse: Cart_I = JSON.parse(JSON.stringify(response))
			dispatch(updateLineItem(serializedResponse))
		} catch (error) {
			console.error(error)
		}
	}

	async function asyncRemoveLineItem(action: RemoveLineItems_I) {
		try {
			const response: unknown = await client.checkout.removeLineItems(
				action.checkoutId,
				action.lineItemIds,
			)
			// serialized to prevent dispatch error
			const serializedResponse: Cart_I = JSON.parse(JSON.stringify(response))
			dispatch(removeLineItem(serializedResponse))
		} catch (error) {
			console.error(error)
		}
	}

	return {
		// selectors
		isCartOpen: useAppSelector((state) => state.shopify.isCartOpen),
		checkoutId: useAppSelector((state) => state.shopify.checkout.id),
		checkoutUrl: useAppSelector((state) => state.shopify.checkout.webUrl),
		lineItems: useAppSelector((state) => state.shopify.checkout.lineItems),
		lineItemCount: useAppSelector((state) => state.shopify.lineItemCount),
		totalItemCount: useAppSelector((state) => state.shopify.totalItemCount),
		isCartEmpty: useAppSelector((state) => state.shopify.lineItemCount === 0),
		subtotalPrice: useAppSelector(
			(state) => state.shopify.checkout.subtotalPrice,
		),
		totalTax: useAppSelector((state) => state.shopify.checkout.totalTax),
		totalPrice: useAppSelector((state) => state.shopify.checkout.totalPrice),
		// actions
		toggleCart: (action: boolean) => dispatch(toggleCart(action)),
		createCheckout: () => asyncCreateCheckout(),
		addLineItem: (action: AddLineItems_I) => asyncAddLineItem(action),
		updateLineItem: (action: UpdateLineItems_I) =>
			asyncUpdateLineItem(action),
		removeLineItem: (action: RemoveLineItems_I) =>
			asyncRemoveLineItem(action),
	}
}
