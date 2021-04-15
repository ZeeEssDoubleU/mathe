import { usePersistQuery } from "./usePersistQuery"

// persist checkout to local storage
export function usePersistCheckout() {
	const persistQuery = usePersistQuery()
	const localStorageKey = "mathe-checkoutId"

	return {
		set: (checkoutId: string) => {
			return persistQuery.set(localStorageKey, checkoutId)
		},
		get: (): string | null => {
			return persistQuery.get(localStorageKey)
		},
		remove: () => {
			return persistQuery.remove(localStorageKey)
		},
	}
}
