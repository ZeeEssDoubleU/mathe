import { GraphQLClient } from "graphql-request"

// env vars
const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME
const storefrontToken = process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.GATSBY_SHOPIFY_API_VERSION

// shop details
const shopUrl = `${shopName}.myshopify.com`
const endpoint = `https://${shopUrl}/api/${apiVersion}/graphql.json`

// init shopify graphql client
export const shopifyClient = new GraphQLClient(endpoint)
shopifyClient.setHeaders({
	"X-Shopify-Storefront-Access-Token": storefrontToken,
	Accept: "application/json",
} as HeadersInit) // ! for TS warning
