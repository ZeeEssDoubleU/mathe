import {
	app_green_hex,
	app_green_hsl,
} from "../src/styles/styled-components/theme"

// dotenv needed to protect contentful API keys
import "dotenv/config"

// import override queries
import shop from "./queries/shopify/shop"
import products from "./queries/shopify/products"

// import icon paths
import { faviconPath, faviconSharePath } from "./prebuild"

export default {
	siteMetadata: {
		title: "Premium Yerba Mate", // declared in globalSEO on DatoCMS
		titleTemplate: " | Mathé", // declared in globalSEO on DatoCMS
		description: "Premium yerba mate and tea blends.", // declared in globalSEO on DatoCMS
		siteUrl: "https://www.mathetea.com", // No trailing slash allowed!
		image: faviconSharePath, // declared in globalSEO on DatoCMS
		themeColor: "",
		keywords:
			"yerba mate, tea, premium tea, premium yerba mate, healthy drink, antioxidant, organic, organic yerba mate",
		lang: "en",
	},
	flags: {
		DEV_SSR: false,
	},
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-robots-txt",
		"gatsby-transformer-sharp",
		"gatsby-transformer-json",
		"gatsby-plugin-loadable-components-ssr",
		"gatsby-plugin-svgr",
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: process.env.GATSBY_GTM_ID,
				includeInDevelopment: false,
				defaultDataLayer: { platform: "gatsby" },
			},
		},
		{
			resolve: `gatsby-plugin-webfonts`,
			options: {
				fonts: {
					google: [
						{
							family: "Montserrat",
							variants: ["200", "200i", "300", "300i", "400", "500"],
						},
						{
							family: "Merriweather",
							variants: ["300", "300i"],
						},
					],
				},
				// formats: ['woff2', 'woff'],
				// useMinify: true,
				// usePreload: true,
				// usePreconnect: false,
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Premium Yerba Mate | Mathé",
				short_name: "Mathé",
				start_url: "/",
				background_color: "black",
				theme_color: app_green_hex,
				display: "standalone",
				icon: faviconPath, // declared in globalSEO on DatoCMS,
				icon_options: {
					purpose: `any maskable`,
				},
			},
		},
		{
			resolve: "gatsby-plugin-styled-components",
			options: {
				pure: true,
			},
		},
		{
			resolve: "gatsby-source-shopify",
			options: {
				shopName: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}`,
				// See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
				accessToken: `${process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN}`,
				apiVersion: "2021-04",
				downloadImages: true,
				shopifyQueries: {
					shopDetails: shop,
					products: products,
				},
			},
		},
		{
			resolve: "gatsby-source-datocms",
			options: {
				apiToken: process.env.DATOCMS_API_TOKEN,
				disableLiveReload: false,
				localeFallbacks: {
					it: ["en"],
				},
			},
		},
		{
			resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
			options: {
				devMode: false, // ! change if you want to show
			},
		},
		// load after manifest (above) so manifest can be cached
		"gatsby-plugin-offline",
	],
}
