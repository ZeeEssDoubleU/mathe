import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"

// ************
// types
// ************

export interface AnimationState_I {
	translate_page: "up" | "down"
	duration_page: number
	duration_bg: number
}

// ************
// init state
// ************

const initialState: AnimationState_I = {
	translate_page: "down",
	duration_page: 0.7, // seconds
	duration_bg: 0.2, // seconds
}

// ************
// slice
// ************

export const animationSlice = createSlice({
	name: "animation",
	initialState,
	reducers: {
		setTranslate_page: (
			state,
			action: PayloadAction<AnimationState_I["translate_page"]>,
		) => {
			state.translate_page = action.payload
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useAnimation() {
	const dispatch = useAppDispatch()

	// ***  selectors
	const translate_page = useAppSelector(
		(state) => state.animation.translate_page,
	)
	const duration_page = useAppSelector(
		(state) => state.animation.duration_page,
	)
	const duration_bg = useAppSelector((state) => state.animation.duration_bg)

	// *** actions
	function setTranslate_page(action: AnimationState_I["translate_page"]) {
		dispatch(animationSlice.actions.setTranslate_page(action))
	}

	return {
		// selectors
		translate_page,
		duration_page_ms: duration_page * 1000, // ms
		duration_bg_ms: duration_bg * 1000, // ms
		// actions
		setTranslate_page,
	}
}
