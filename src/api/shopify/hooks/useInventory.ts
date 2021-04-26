import { shopifyClient } from "../graphql"
// import types / fragments
import { useCollectionByHandleQuery } from "../graphql/types"
import { useShopify } from "../../../redux"

// ************
// hook
// ************

export function useInventory(handle: string) {
	const shopifyState = useShopify()

	// get product
	const { data: collection, isLoading } = useCollectionByHandleQuery(
		shopifyClient,
		{
			handle,
		},
		{
			queryKeyHashFn: () => `["inventory","${handle}"]`,
			onSuccess: (data) => {
				const products = data.collectionByHandle?.products.edges

				if (products) {
					shopifyState.updateInventory(products)
				}
			},
		},
	)

	return {
		collection,
		isLoading,
	}
}
