// persist checkout to local storage
export function usePersistQuery() {
	return {
		set: (localStorageKey: string, query: unknown) => {
			return localStorage.setItem(localStorageKey, JSON.stringify(query))
		},
		get: (localStorageKey: string) => {
			const cacheString = localStorage.getItem(localStorageKey)
			return !cacheString ? null : JSON.parse(cacheString)
		},
		remove: (localStorageKey: string) => {
			return localStorage.removeItem(localStorageKey)
		},
	}
}
