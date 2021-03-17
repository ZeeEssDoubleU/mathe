import { CreatePagesArgs } from "gatsby"

// ************
// types
// ************

export interface CreatePagesQuery_I {
	data?: {
		allShopifyCollection: {
			nodes: {
				handle: string
				products: {
					handle: string
				}[]
			}[]
		}
	}
}

// ************
// create pages
// ************

export async function createPages({
	actions,
	graphql,
	reporter,
}: CreatePagesArgs): Promise<void> {
	const { data }: CreatePagesQuery_I = await graphql(`
		{
			allShopifyCollection {
				nodes {
					handle
					products {
						handle
					}
				}
			}
		}
	`)

	if (!data) {
		reporter.panicOnBuild("Could not fetch Shopify products on build.")
		return
	}

	data.allShopifyCollection.nodes.forEach((node) => {
		const { handle, products } = node
		if (!handle) return

		// store each collection's product handles in array
		const collection_product_slugs = products.map((product) => product.handle)

		actions.createPage({
			path: `products/${handle}`,
			component: require.resolve(`../src/templates/Products.tsx`),
			context: {
				collection_slug: handle,
				collection_product_slugs,
			},
		})
	})
}
