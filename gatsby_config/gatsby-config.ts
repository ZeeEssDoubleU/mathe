import fs from "fs"
import axios, { AxiosResponse } from "axios"

// dotenv needed to protect contentful API keys
import "dotenv/config"

// creates favicon.svg and faviconShare.svg file for gatsby-plugin-manifest
const saveIcons = async (): Promise<void> => {
	const favicon: AxiosResponse = await axios.get(
		"https://www.datocms-assets.com/16917/1575087444-favicon.svg",
	)
	const faviconShare: AxiosResponse = await axios.get(
		"https://www.datocms-assets.com/16917/1575087312-favicon-share.svg",
	)
	fs.writeFile("./src/components/Icons/favicon.svg", favicon.data, (err) => {
		if (err) console.log(err)
		else console.log("Favicon was saved!")
	})
	fs.writeFile(
		"./src/components/Icons/faviconShare.svg",
		faviconShare.data,
		(err) => {
			if (err) console.log(err)
			else console.log("Shareable favicon was saved!")
		},
	)
}
saveIcons()

export default {
	siteMetadata: {
		title: "Premium Yerba Mate", // declared in globalSEO on DatoCMS
		titleTemplate: " | Mathé", // declared in globalSEO on DatoCMS
		description: "Premium yerba mate and tea blends.", // declared in globalSEO on DatoCMS
		siteUrl: "https://www.mathetea.com", // No trailing slash allowed!
		image: "./src/components/Icons/faviconShare.svg", // declared in globalSEO on DatoCMS
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
		"gatsby-plugin-preact",
		"gatsby-plugin-robots-txt",
		"gatsby-transformer-sharp",
		"gatsby-transformer-json",
		{
			resolve: "gatsby-plugin-web-font-loader",
			options: {
				google: {
					families: [
						"Montserrat:200,200i,300,300i,400,500",
						"Merriweather:300,300i",
					],
				},
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Premium Yerba Mate | Mathé",
				short_name: "Mathé",
				start_url: "/",
				background_color: "black",
				theme_color: "hsla(86, 48%, 48%, 1.0)",
				display: "standalone",
				icon: "./src/components/Icons/favicon.svg", // declared in globalSEO on DatoCMS,
			},
		},
		// load after manifest (above) so manifest can be cached
		"gatsby-plugin-offline",
		{
			resolve: "gatsby-plugin-styled-components",
			options: {
				pure: true,
			},
		},
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true, // Print removed selectors and processed file names
				develop: true, // Enable while using `gatsby develop`
				// tailwind: true, // Enable tailwindcss support
				// ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
				// purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
				purgeCSSOptions: {
					// https://purgecss.com/configuration.html#options
					// safelist: ['safelist'], // Don't remove this selector
				},
			},
		},
		{
			resolve: "gatsby-source-shopify",
			options: {
				shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
				// See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
				accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
				apiVersion: "2021-01",
				downloadImages: true,
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
	],
}
