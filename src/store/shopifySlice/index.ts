import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../index"
import { useOperations } from "./hooks"

// ************
// types
// ************
export interface ShopifyState_I {
	isCartOpen: boolean
}

// ************
// init state
// ************

const initialState: ShopifyState_I = {
	isCartOpen: false,
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
		// selectors
		isCartOpen: useAppSelector((state) => state.shopify.isCartOpen),
		// actions
		toggleCart: (action: boolean) => dispatch(toggleCart(action)),
		// queries
		...useOperations(),
	}
}
