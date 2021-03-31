import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"
// import animations
import { animations as anim } from "../utils"

// ************
// types
// ************

export interface TransitionState_I {
	inProgress: boolean
	duration_page_s: number
	duration_bg_s: number
}

// ************
// init state
// ************

const initialState: TransitionState_I = {
	inProgress: false,
	duration_page_s: 0.7,
	duration_bg_s: 0.2,
}

// ************
// slice
// ************

export const transitionSlice = createSlice({
	name: "transition",
	initialState,
	reducers: {
		setInProgress: (state, action: PayloadAction<boolean>) => {
			state.inProgress = action.payload
		},
	},
})

// ************
// hook
// ************

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useTransition() {
	const dispatch = useAppDispatch()

	// ***  selectors
	const inProgress = useAppSelector((state) => state.transition.inProgress)
	const duration_page_s = useAppSelector(
		(state) => state.transition.duration_page_s,
	)
	const duration_bg_s = useAppSelector(
		(state) => state.transition.duration_bg_s,
	)

	// *** actions
	function setInProgress(action: boolean) {
		dispatch(transitionSlice.actions.setInProgress(action))
	}

	// page animations
	function translateUp_page_set() {
		anim.translateUp_set(".page-transition")
	}
	function translateUp_page() {
		setInProgress(true)
		anim.translateUp(".page-transition", duration_page_s)
	}
	function translateDown_page_set() {
		anim.translateDown_set(".page-transition")
	}
	function translateDown_page() {
		setInProgress(true)
		anim.translateDown(".page-transition", duration_page_s)
	}

	// nav animataions
	function nav_fadeIn() {
		anim.fadeIn_stagger(".nav-item")
	}

	return {
		// selectors
		inProgress,
		duration_page_s,
		duration_bg_s,
		duration_page_ms: duration_page_s * 1000,
		duration_bg_ms: duration_bg_s * 1000,
		// actions
		setInProgress,
		translateUp_page_set,
		translateUp_page,
		translateDown_page_set,
		translateDown_page,
		nav_fadeIn,
	}
}
