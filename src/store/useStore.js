// @ts-nocheck
import React, { createContext, useReducer, useContext, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

// ************
// action types
// ************

const SET_ACTIVE_PRODUCTS_CATEGORY = "SET_ACTIVE_PRODUCTS_CATEGORY"
const TRANSITION_TRIGGERED = "TRANSITION_TRIGGERED"

// ************
// action creators
// ************

export const setActiveCategory = (dispatch, payload) => {
  dispatch({ type: SET_ACTIVE_PRODUCTS_CATEGORY, payload })
}
export const transitionTriggered = (dispatch, payload) => {
  dispatch({ type: TRANSITION_TRIGGERED, payload })
}

// ************
// reducer
// ************

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_PRODUCTS_CATEGORY:
      return { ...state, activeCategory: action.payload }
    case TRANSITION_TRIGGERED:
      return { ...state, transition_triggered_page: action.payload }
    default:
      return state
  }
}

// ************
// initial state
// ************

// if not a product page, active category equals yerba mate
// otherwise, active category equal product page category
const activeCategory = (categories, path) =>
  !path.includes("/products")
    ? "yerba mate"
    : categories.edges
        .filter(category => path.includes(category.node.slug))[0]
        .node.title.toLowerCase()

const initState = (categories, path) => {
  return typeof window !== "undefined"
    ? {
        activeCategory: activeCategory(categories, path),
        transition_duration_page: 0.7,
        transition_triggered_page: false,
        transition_duration_background: 0.2,
      }
    : {} // fallback to {} so that sub states don't return null
}

// ************
// provider
// ************

// context that stores and shares data
const StoreContext = createContext()

export const StoreProvider = ({ children, path }) => {
  const { categories } = useStaticQuery(query)
  const [state, dispatch] = useReducer(reducer, initState(categories, path))

  // change active category on path change
  useEffect(() => {
    setActiveCategory(dispatch, activeCategory(categories, path))
  }, [path])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

// ************
// consumer - hook
// ************

export const useStore = () => {
  const { state, dispatch } = useContext(StoreContext)
  return { state, dispatch }
}

// ************
// query
// ************

const query = graphql`
  {
    categories: allDatoCmsCategory {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
