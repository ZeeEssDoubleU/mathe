import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
// import reducers / hooks
import { categorySlice, useCategory } from "./categorySlice"
import { transitionSlice, useTransition } from "./transitionSlice"
import { shopifySlice, useShopify } from "./shopifySlice"

// ************
// store
// ************

// TODO: need to figure out how to preload state from query
const store = configureStore({
	reducer: {
		category: categorySlice.reducer,
		transition: transitionSlice.reducer,
		shopify: shopifySlice.reducer,
	},
})
export default store

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
// named exports
// ************

export { useCategory, useTransition, useShopify }
