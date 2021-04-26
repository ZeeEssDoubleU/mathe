import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import type
import { Layout_I } from "../components/Layout/Layout"
import {
	BackgroundCategoryFragment,
	BackgroundImageFragment,
	LayoutComponentQuery,
} from "../graphql/types"

// ************
// types
// ************

export interface CategoryState_I {
	selectedCategory: string
	backgroundMap: Record<string, BackgroundImageFragment[]>
	backgroundIndex: number
	backgroundQueue: string[]
}
export interface SelectedCategoryPayload_I {
	path: Layout_I["path"]
	categories: LayoutComponentQuery["categories"]
}

// ************
// init state
// ************

const initialState: CategoryState_I = {
	selectedCategory: "all-tea",
	backgroundMap: {},
	backgroundIndex: 0,
	backgroundQueue: [],
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
			state.selectedCategory = !path.includes("/products")
				? initialState.selectedCategory
				: // set category to matching slug
				  categories.nodes.find((category) => path.includes(category.slug))
						?.slug ||
				  // set category to initialState.selectedCategory if slug not found
				  initialState.selectedCategory
		},
		setBackgroundMap: (
			state,
			action: PayloadAction<BackgroundCategoryFragment[]>,
		) => {
			const categories = action.payload

			// map background images by category into hash table
			const backgroundMap = categories?.reduce<
				CategoryState_I["backgroundMap"]
			>((table, category) => {
				const slug = category.slug
				const images = category.images.imageGallery

				table[slug] = images
				return table
			}, {})

			state.backgroundMap = {
				...state.backgroundMap,
				...backgroundMap,
			}
		},
		setBackgroundIndex: (state, action: PayloadAction<number>) => {
			state.backgroundIndex = action.payload
		},
		setBackgroundQueue: (state, action: PayloadAction<string>) => {
			state.backgroundQueue = [
				action.payload,
				...state.backgroundQueue,
			].slice(0, 3)
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useCategory() {
	const dispatch = useAppDispatch()
	const {
		selectCategory,
		setBackgroundMap,
		setBackgroundIndex,
		setBackgroundQueue,
	} = categorySlice.actions

	const selectedCategory = useAppSelector(
		(state) => state.category.selectedCategory,
	)
	const selectedCategoryGallery = useAppSelector(
		(state) => state.category.backgroundMap[selectedCategory],
	)
	const backgroundIndex = useAppSelector(
		(state) => state.category.backgroundIndex,
	)
	const backgroundQueue = useAppSelector(
		(state) => state.category.backgroundQueue,
	)

	return {
		// selectors
		selectedCategory: selectedCategory,
		selectedCategoryGallery: selectedCategoryGallery,
		backgroundMap: useAppSelector((state) => state.category.backgroundMap),
		backgroundIndex: backgroundIndex,
		selectedBackground:
			selectedCategoryGallery && selectedCategoryGallery[backgroundIndex],
		backgroundQueue: backgroundQueue,
		// actions
		selectCategory: (action: SelectedCategoryPayload_I) => {
			dispatch(selectCategory(action))
		},
		setBackgroundMap: (action: BackgroundCategoryFragment[]) => {
			dispatch(setBackgroundMap(action))
		},
		setBackgroundIndex: (action: number) => {
			dispatch(setBackgroundIndex(action))
		},
		setBackgroundQueue: (action: string) => {
			dispatch(setBackgroundQueue(action))
		},
	}
}
