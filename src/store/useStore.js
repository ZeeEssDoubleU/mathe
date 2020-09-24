// @ts-nocheck
import React, { createContext, useReducer, useContext } from "react"

// action types
const SET_ACTIVE_PRODUCTS_CATEGORY = "SET_ACTIVE_PRODUCTS_CATEGORY"
const SAVE_PREV_PATH = "SAVE_PREV_PATH"
const SAVE_CURRENT_PATH = "SAVE_CURRENT_PATH"
const TRANSITION_TRIGGERED = "TRANSITION_TRIGGERED"
const SET_LOADING = "SET_LOADING"

// action creators
export const setActiveCategory = (dispatch, payload) => {
  dispatch({ type: SET_ACTIVE_PRODUCTS_CATEGORY, payload })
}
export const savePrevPath = (dispatch, payload) => {
  dispatch({ type: SAVE_PREV_PATH, payload })
}
export const saveCurrentPath = (dispatch, payload) => {
  dispatch({ type: SAVE_CURRENT_PATH, payload })
}
export const transitionTriggered = (dispatch, payload) => {
  dispatch({ type: TRANSITION_TRIGGERED, payload })
}

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_PRODUCTS_CATEGORY:
      return { ...state, activeCategory: action.payload }
    case SAVE_PREV_PATH:
      return { ...state, pathname_prev: action.payload }
    case SAVE_CURRENT_PATH:
      return { ...state, pathname_current: action.payload }
    case TRANSITION_TRIGGERED:
      return { ...state, transition_triggered_page: action.payload }
    case SET_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
}

// initial state
const initState =
  typeof window !== "undefined"
    ? {
        loading: true,
        activeCategory: "yerba mate",
        pathname_prev: "/",
        pathname_current: "/",
        transition_duration_page: 0.7,
        transition_triggered_page: false,
        transition_duration_background: 0.2,
      }
    : {} // fallback to {} so that sub states don't return null

// context that stores and shares data
const StoreContext = createContext(initState)

// component to wrap upper level root component with Provider
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

// useStore hook.  Acts as Consumer through useContext
export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext)
  return { state, dispatch }
}
