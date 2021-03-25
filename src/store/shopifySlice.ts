import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import shopify client
import Client from "shopify-buy"

const client = Client.buildClient({
	storefrontAccessToken: `${process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
	domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
})

// ************
// types
// ************

export interface ShopifyState_I {
	isCartOpen: boolean
	cartCount: number
	checkout: {
		id: string
		lineItems: {
			id: string
			title: string
			quantity: number
			variant: {
				price: string
			}
		}[]
		subtotalPrice: string
		totalTax: string
		totalPrice: string
	}
	products: unknown[]
	shop: unknown
}
export interface AddVariant_I {
	checkoutId: string
	lineItems: {
		variantId: string
		quantity: number
	}[]
}
export interface RemoveVariant_I {
	checkoutId: string
	lineItems: string[]
}

// ************
// init state
// ************

const initialState: ShopifyState_I = {
	isCartOpen: false,
	cartCount: 0,
	checkout: {},
	products: [],
	shop: {},
}

// ************
// slice
// ************

export const shopifySlice = createSlice({
	name: "shopify",
	initialState,
	reducers: {
		toggleCart: (state, action: PayloadAction<boolean>) => {
			state.isCartOpen = action.payload
		},
		createCheckout: (state, action) => {
			state.checkout = action.payload
		},
		addLineItem: (state, action) => {
			state.checkout = action.payload
		},
		updateLineItem: (state, action) => {
			state.checkout = action.payload
		},
		removeLineItem: (state, action) => {
			state.checkout = action.payload
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

	async function asyncCreateCheckout() {
		const response = await client.checkout.create()
		dispatch(createCheckout(response))
	}

	async function asyncAddLineItem(action: AddVariant_I) {
		const response = await client.checkout.addLineItems(
			action.checkoutId,
			action.lineItems,
		)
		dispatch(addLineItem(response))
	}

	async function asyncUpdateLineItem(action: AddVariant_I) {
		const response = await client.checkout.updateLineItems(
			action.checkoutId,
			action.lineItems,
		)
		dispatch(updateLineItem(response))
	}

	async function asyncRemoveLineItem(action: AddVariant_I) {
		const response = await client.checkout.removeLineItems(
			action.checkoutId,
			action.lineItems,
		)
		dispatch(removeLineItem(response))
	}

	return {
		toggleCart: (action: boolean) => dispatch(toggleCart(action)),
		createCheckout: () => asyncCreateCheckout(),
		addLineItem: (action: AddVariant_I) => asyncAddLineItem(action),
		updateLineItem: (action: AddVariant_I) => asyncUpdateLineItem(action),
		removeLineItem: (action: AddVariant_I) => asyncRemoveLineItem(action),
		isCartOpen: useAppSelector((state) => state.shopify.isCartOpen),
		isCartEmpty: useAppSelector(
			(state) => state.shopify.checkout.lineItems?.length === 0,
		),
		checkoutId: useAppSelector((state) => state.shopify.checkout.id),
		lineItems: useAppSelector((state) => state.shopify.checkout.lineItems),
		subtotalPrice: useAppSelector(
			(state) => state.shopify.checkout.subtotalPrice,
		),
		totalTax: useAppSelector((state) => state.shopify.checkout.totalTax),
		totalPrice: useAppSelector((state) => state.shopify.checkout.totalPrice),
	}
}
