import React, {
	createContext,
	useReducer,
	useContext,
	useEffect,
	ReactElement,
	Dispatch,
} from "react"
import { useStaticQuery, graphql, PageProps } from "gatsby"

// ************
// types
// ************

export interface InitState_I {
	activeCategory?: string
	transition_duration_page?: number
	transition_triggered_page?: boolean
	transition_duration_background?: number
}
export type Action_Props =
	| {
			type: "SET_ACTIVE_PRODUCTS_CATEGORY"
			payload: string
	  }
	| {
			type: "TRANSITION_TRIGGERED"
			payload: boolean
	  }
export interface Store_I {
	children?: ReactElement | ReactElement[]
	path: PageProps["path"]
}
export interface StoreQuery_I {
	categories: {
		edges: {
			node: {
				title: string
				slug: string
			}
		}[]
	}
}

// ************
// action creators
// ************

export const setActiveCategory = (
	dispatch: Dispatch<Action_Props>,
	payload: string,
) => {
	dispatch({ type: "SET_ACTIVE_PRODUCTS_CATEGORY", payload })
}
export const transitionTriggered = (
	dispatch: Dispatch<Action_Props>,
	payload: boolean,
) => {
	dispatch({ type: "TRANSITION_TRIGGERED", payload })
}

// ************
// initial state
// ************

// if not a product page, active category equals yerba mate
// otherwise, active category equal product page category
const activeCategory = (
	categories: StoreQuery_I["categories"],
	path: PageProps["path"],
): string => {
	return !path.includes("/products")
		? "yerba mate"
		: categories!.edges
				.filter((category) => path.includes(category.node.slug))[0]
				.node.title.toLowerCase()
}

const initState: InitState_I =
	typeof window !== "undefined"
		? {
				activeCategory: "yerba mate",
				transition_duration_page: 0.7,
				transition_triggered_page: false,
				transition_duration_background: 0.2,
		  }
		: {} // fallback to {} so that sub states don't return null

// const initState =
// 	typeof window !== "undefined"
// 		? {
// 				activeCategory: 'activeCategory(categories, path)',
// 				transition_duration_page: 0.7,
// 				transition_triggered_page: false,
// 				transition_duration_background: 0.2,
// 		  }
// 		: {}; // fallback to {} so that sub states don't return null

// ************
// reducer
// ************

const reducer = (state: InitState_I, action: Action_Props) => {
	switch (action.type) {
		case "SET_ACTIVE_PRODUCTS_CATEGORY":
			return { ...state, activeCategory: action.payload }
		case "TRANSITION_TRIGGERED":
			return { ...state, transition_triggered_page: action.payload }
		default:
			return state
	}
}

// ************
// provider
// ************

// // context that stores and shares data
// const StoreContext = createContext<InitState_I>(initState);

// context that stores and shares data
const StoreContext = createContext<{
	state: InitState_I
	dispatch: Dispatch<Action_Props>
}>({ state: initState, dispatch: () => null })

export function StoreProvider({ children, path }: Store_I): ReactElement {
	const { categories }: StoreQuery_I = useStaticQuery(query)
	const [state, dispatch] = useReducer(reducer, initState)

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
