const axios = require("axios")
const fs = require("fs")

// dotenv needed to protect contentful API keys
require("dotenv/config")

// creates favicon.svg and faviconShare.svg file for gatsby-plugin-manifest
const saveIcons = async () => {
  const favicon = await axios.get(
    "https://www.datocms-assets.com/16917/1575087444-favicon.svg"
  )
  const faviconShare = await axios.get(
    "https://www.datocms-assets.com/16917/1575087312-favicon-share.svg"
  )
  fs.writeFile(
    "./src/components/Icons/favicon.svg",
    favicon.data,
    err => console.log(err),
    res => console.log("Favicon was saved!")
  )
  fs.writeFile(
    "./src/components/Icons/faviconShare.svg",
    faviconShare.data,
    err => console.log(err),
    res => console.log("Shareable favicon was saved!")
  )
}
saveIcons()

module.exports = {
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
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
            "Merriweather:300,300i,400,400i,700,700i,900,900i",
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
    "gatsby-plugin-offline", // load after manifest (above) so manifest can be cached
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        pure: true,
      },
    },
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        disableLiveReload: false,
        localeFallbacks: {
          it: ["en"],
        },
      },
    },
  ],
}
