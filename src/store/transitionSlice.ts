import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "./index"

// ************
// types
// ************

export interface TransitionState_I {
	inProgress: boolean
	duration_page: number
	duration_bg: number
}

// ************
// init state
// ************

const initialState: TransitionState_I = {
	inProgress: false,
	duration_page: 0.7,
	duration_bg: 0.2,
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
	const { setInProgress } = transitionSlice.actions

	return {
		setInProgress: (action: boolean) => dispatch(setInProgress(action)),
		inProgress: useAppSelector((state) => state.transition.inProgress),
		duration_page: useAppSelector((state) => state.transition.duration_page),
		duration_bg: useAppSelector((state) => state.transition.duration_bg),
	}
}
