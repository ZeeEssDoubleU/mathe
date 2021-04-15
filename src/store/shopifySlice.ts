import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"

// ************
// types
// ************

export interface ShopifyStateI {
	isCartOpen: boolean
	checkoutId: string
	inventory: Record<string, number>
}

// ************
// init state
// ************

const initialState: ShopifyStateI = {
	isCartOpen: false,
	checkoutId: "",
	inventory: {},
}

// ************
// slice
// ************

export const shopifySlice = createSlice({
	name: "shopify",
	initialState,
	reducers: {
		toggleCart: (
			state,
			action: PayloadAction<ShopifyStateI["isCartOpen"]>,
		) => {
			state.isCartOpen = action.payload
		},
		setCheckoutId: (
			state,
			action: PayloadAction<ShopifyStateI["checkoutId"]>,
		) => {
			state.checkoutId = action.payload
		},
		updateInventory: (
			state,
			action: PayloadAction<ShopifyStateI["inventory"]>,
		) => {
			state.inventory = {
				...state.inventory,
				...action.payload,
			}
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useShopify() {
	const dispatch = useAppDispatch()
	const { toggleCart, setCheckoutId, updateInventory } = shopifySlice.actions

	return {
		// selectors
		isCartOpen: useAppSelector((state) => state.shopify.isCartOpen),
		checkoutId: useAppSelector((state) => state.shopify.checkoutId),
		getInventoryByHandle: (handle: string) =>
			useAppSelector((state) => state.shopify.inventory[handle]),
		// actions
		toggleCart: (action: ShopifyStateI["isCartOpen"]) =>
			dispatch(toggleCart(action)),
		setCheckoutId: (action: ShopifyStateI["checkoutId"]) =>
			dispatch(setCheckoutId(action)),
		updateInventory: (action: ShopifyStateI["inventory"]) =>
			dispatch(updateInventory(action)),
	}
}
