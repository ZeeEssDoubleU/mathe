import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import {
	Provider,
	useDispatch,
	useSelector,
	TypedUseSelectorHook,
} from "react-redux"
// import reducers / hooks
import { categorySlice } from "./categorySlice"
import { shopifySlice } from "./shopifySlice"
import { animationSlice } from "./animationSlice"
// import types
import { Provider_I } from "../@types/custom"

// ************
// store
// ************

// TODO: need to figure out how to preload state from query
const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
		shopify: shopifySlice.reducer,
		animation: animationSlice.reducer,
	},
})

// ************
// types
// ************

export type Dispatch_Type = typeof store.dispatch
export type RootState_Type = ReturnType<typeof store.getState>
// use these instead of default useDispatch and useSelector
// adds on declared types
export const useAppDispatch = (): Dispatch_Type => useDispatch<Dispatch_Type>()
export const useAppSelector: TypedUseSelectorHook<RootState_Type> = useSelector

// ************
// provider
// ************

export default function ReduxProvider({ children }: Provider_I) {
	return <Provider store={store}>{children}</Provider>
}

// ************
//  exports
// ************

export * from "./categorySlice"
export * from "./shopifySlice"
export * from "./animationSlice"
