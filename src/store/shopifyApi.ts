import { createApi } from "@rtk-incubator/rtk-query"
import { gql, GraphQLClient } from "graphql-request"
import { serialize } from "../utils"

// env vars
const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME
const storefrontToken = process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.GATSBY_SHOPIFY_API_VERSION

// console.log("shopName:", shopName)
// console.log("storefrontToken:", storefrontToken)
// console.log("apiVersion:", apiVersion)

// shop details
const shopUrl = `${shopName}.myshopify.com`
const endpoint = `https://${shopUrl}/api/${apiVersion}/graphql.json`

// init graphql client
const client = new GraphQLClient(endpoint)
client.setHeaders({
	"X-Shopify-Storefront-Access-Token": storefrontToken,
	Accept: "application/json",
})

const graphqlBaseQuery = () => async ({ body }) => {
	const result = await client.request(body)
	return { data: serialize(result) }
}

// Define a service using a base URL and expected endpoints
export const shopifyApi = createApi({
	reducerPath: "shopifyApi",
	baseQuery: graphqlBaseQuery(),
	endpoints: (build) => ({
		createCheckout: build.mutation({
			query: () => ({
				body: gql`
					mutation {
						checkoutCreate(input: {}) {
							checkout {
								id
								webUrl
								createdAt
							}
						}
					}
				`,
			}),
			transformResponse: (response) => {
				return response.checkoutCreate.checkout
			},
		}),
		getCollections: build.query({
			query: () => ({
				body: gql`
					query {
						collections(first: 10) {
							edges {
								node {
									handle
								}
							}
						}
					}
				`,
			}),
			transformResponse: (response) => {
				const handles: string[] = response.collections.edges.map(
					(edge) => edge.node.handle,
				)
				return handles
			},
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateCheckoutMutation, useGetCollectionsQuery } = shopifyApi
