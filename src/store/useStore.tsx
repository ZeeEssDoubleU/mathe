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
	activeCategory: string
	transition_duration_page: number
	transition_triggered_page: boolean
	transition_duration_background: number
}
export interface Init_I {
	categories: StoreQuery_I["categories"]
	path: PageProps["path"]
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
export interface StoreContext_I {
	state: InitState_I
	dispatch: Dispatch<Action_Props>
}
export interface StoreQuery_I {
	categories: {
		nodes: {
			title: string
			slug: string
		}[]
	}
}

// ************
// action creators
// ************

export function setActiveCategory(
	dispatch: Dispatch<Action_Props>,
	payload: string,
): void {
	dispatch({ type: "SET_ACTIVE_PRODUCTS_CATEGORY", payload })
}
export function transitionTriggered(
	dispatch: Dispatch<Action_Props>,
	payload: boolean,
): void {
	dispatch({ type: "TRANSITION_TRIGGERED", payload })
}

// ************
// initial state
// ************

// if not a product page, active category equals yerba mate
// otherwise, active category equal product page category
export function activeCategory({ categories, path }: Init_I): string {
	return !path.includes("/products")
		? "yerba mate"
		: categories.nodes
				.filter((category) => path.includes(category.slug))[0]
				.title.toLowerCase()
}

const initState: InitState_I = {
	activeCategory: "yerba mate",
	transition_duration_page: 0.7,
	transition_triggered_page: false,
	transition_duration_background: 0.2,
}
function init({ categories, path }: Init_I): InitState_I {
	return {
		activeCategory: activeCategory({ categories, path }),
		transition_duration_page: 0.7,
		transition_triggered_page: false,
		transition_duration_background: 0.2,
	}
}

// ************
// reducer
// ************

function reducer(state: InitState_I, action: Action_Props) {
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

// context that stores and shares data
const StoreContext = createContext<StoreContext_I>({
	state: initState,
	dispatch: () => null,
})

export function StoreProvider({ children, path }: Store_I): ReactElement {
	const { categories }: StoreQuery_I = useStaticQuery(query)
	// 3rd arg added to lazily initialize state.
	// ie. computes state resulting from function
	const [state, dispatch] = useReducer(reducer, { categories, path }, init)

	// change active category on path change
	useEffect(() => {
		setActiveCategory(dispatch, activeCategory({ categories, path }))
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

export function useStore(): StoreContext_I {
	const { state, dispatch } = useContext(StoreContext)
	return { state, dispatch }
}

// ************
// query
// ************

const query = graphql`
	{
		categories: allDatoCmsCategory {
			nodes {
				title
				slug
			}
		}
	}
`
