import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import type
import { Layout_I, LayoutQuery_I } from "../components/Layout/Layout"

// ************
// types
// ************

export interface CategoryState_I {
	selected: string
}
export interface SelectedCategoryPayload_I {
	path: Layout_I["path"]
	categories: LayoutQuery_I["categories"]
}

// ************
// init state
// ************

const initialState: CategoryState_I = {
	selected: "all-tea",
}

// ************
// slice
// ************

export const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		selectCategory: (
			state,
			action: PayloadAction<SelectedCategoryPayload_I>,
		) => {
			const { categories, path } = action.payload

			// check if page path includes contains "products"
			state.selected = !path.includes("/products")
				? initialState.selected
				: // set category to matching slug
				  categories.nodes.find((category) => path.includes(category.slug))
						?.slug ||
				  // set category to initialState.selected if slug not found
				  initialState.selected
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useCategory() {
	const dispatch = useAppDispatch()
	const { selectCategory } = categorySlice.actions

	return {
		selectCategory: (action: SelectedCategoryPayload_I) =>
			dispatch(selectCategory(action)),
		selected: useAppSelector((state) => state.category.selected),
	}
}
