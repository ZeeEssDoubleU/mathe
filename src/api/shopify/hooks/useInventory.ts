import { shopifyClient } from "../graphql"
// import types / fragments
import { useCollectionByHandleQuery } from "../graphql/types"
import { ShopifyStateI, useShopify } from "../../../store"

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

				// turn invenory into hash table
				const inventoryMap = products?.reduce<ShopifyStateI["inventory"]>(
					(table, product) => {
						const handle = product.node.handle
						const totalInventory = product.node.totalInventory || 0

						table[handle] = totalInventory
						return table
					},
					{},
				)

				inventoryMap && shopifyState.updateInventory(inventoryMap)
			},
		},
	)

	return {
		collection,
		isLoading,
	}
}
