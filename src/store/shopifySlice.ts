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
	checkout: unknown
	products: []
	shop: unknown
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
			state.isCartOpen = !action.payload
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useShopify() {
	const dispatch = useAppDispatch()
	const { toggleCart } = shopifySlice.actions

	return {
		openCart: (action: boolean) => dispatch(toggleCart(action)),
	}
}
