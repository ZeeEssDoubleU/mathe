import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import types
import { Product_CollectionByHandleFragment } from "../api/shopify/graphql/types"

// ************
// types
// ************

export interface ShopifyStateI {
	shopReady: boolean
	isCartOpen: boolean
	checkoutId: string
	inventory: Record<string, number>
}

// ************
// init state
// ************

const initialState: ShopifyStateI = {
	shopReady: false, // TODO: change readyToSell to true when products are ready to sell
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
			action: PayloadAction<Product_CollectionByHandleFragment[]>,
		) => {
			const products = action.payload

			// map product counts by handle into hash table
			const inventoryMap = products?.reduce<ShopifyStateI["inventory"]>(
				(table, product) => {
					const handle = product.node.handle
					const totalInventory = product.node.totalInventory || 0

					table[handle] = totalInventory
					return table
				},
				{},
			)

			state.inventory = {
				...state.inventory,
				...inventoryMap,
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
		shopReady: useAppSelector((state) => state.shopify.shopReady),
		isCartOpen: useAppSelector((state) => state.shopify.isCartOpen),
		checkoutId: useAppSelector((state) => state.shopify.checkoutId),
		getInventoryByHandle: (handle: string) =>
			useAppSelector((state) => state.shopify.inventory[handle]),
		// actions
		toggleCart: (action: ShopifyStateI["isCartOpen"]) =>
			dispatch(toggleCart(action)),
		setCheckoutId: (action: ShopifyStateI["checkoutId"]) =>
			dispatch(setCheckoutId(action)),
		updateInventory: (action: Product_CollectionByHandleFragment[]) =>
			dispatch(updateInventory(action)),
	}
}
