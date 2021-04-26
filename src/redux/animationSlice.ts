import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"

// ************
// types
// ************

export interface AnimationState_I {
	translate_page: "up" | "down"
}

// ************
// init state
// ************

const initialState: AnimationState_I = {
	translate_page: "down",
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

	// *** actions
	function setTranslate_page(action: AnimationState_I["translate_page"]) {
		dispatch(animationSlice.actions.setTranslate_page(action))
	}

	return {
		// selectors
		translate_page,
		// actions
		setTranslate_page,
	}
}
