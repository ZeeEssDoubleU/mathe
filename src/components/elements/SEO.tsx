import React, { ReactElement } from "react"
import { Helmet, HelmetProps } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

// ************
// types
// ************

// TODO: make sure SeoQuery_I type check properly
export interface SeoQuery_I {
	site: {
		siteMetadata: {
			title: string
			titleTemplate: string
			description: string
			siteUrl: string
			image: string
			keywords: string
			themeColor: string
			lang: string
		}
	}
	datoCmsSite: {
		faviconMetaTags: {
			attributes: {
				href: string
				rel: string
				sizes: string
			}
			tagName: string
		}[]
		globalSeo: {
			facebookPageUrl?: string
			fallbackSeo: {
				title: string
				twitterCard: string
				description: string
				image: {
					url: string
				}
			}
			siteName: string
			twitterAccount?: string
			titleSuffix: string
		}
	}
}

export interface Seo_I extends HelmetProps {
	description?: string
	image?: string
	keywords?: string
	url?: string
}

// ************
// component
// ************

export default function SEO(props: Seo_I): ReactElement {
	const { site, datoCmsSite }: SeoQuery_I = useStaticQuery(query)
	const { siteMetadata } = site
	const { globalSeo } = datoCmsSite

	return (
		<Helmet
			title={props.title || siteMetadata.title || globalSeo.siteName}
			titleTemplate={
				"%s" + siteMetadata.titleTemplate || "%s" + globalSeo.titleSuffix
			}
		>
			<html lang={siteMetadata.lang} />

			{/* serp */}
			<meta
				name="description"
				content={
					props.description ||
					siteMetadata.description ||
					globalSeo.fallbackSeo.description
				}
			/>
			<meta
				name="image"
				content={
					props.image ||
					siteMetadata.image ||
					globalSeo.fallbackSeo.image.url
				}
			/>
			{/* <meta name="theme-color" content={siteMetadata.themeColor} /> */}
			<meta
				name="keywords"
				content={props.keywords || siteMetadata.keywords}
			/>

			{/* facebook */}
			<meta property="og:url" content={props.url || siteMetadata.siteUrl} />
			<meta
				property="og:title"
				content={
					props.title || siteMetadata.title || globalSeo.fallbackSeo.title
				}
			/>
			<meta
				property="og:description"
				content={
					props.description ||
					siteMetadata.description ||
					globalSeo.fallbackSeo.description
				}
			/>
			<meta
				property="og:image"
				content={
					props.image ||
					siteMetadata.image ||
					globalSeo.fallbackSeo.image.url
				}
			/>

			{/* twitter */}
			<meta name="twitter:card" content="summary" />
			<meta
				name="twitter:title"
				content={
					props.title || siteMetadata.title || globalSeo.fallbackSeo.title
				}
			/>
			<meta
				name="twitter:description"
				content={
					props.description ||
					siteMetadata.description ||
					globalSeo.fallbackSeo.description
				}
			/>
			<meta
				name="twitter:image"
				content={
					props.image ||
					siteMetadata.image ||
					globalSeo.fallbackSeo.image.url
				}
			/>
		</Helmet>
	)
}

// ************
// query
// ************

const query = graphql`
	query SeoComponent {
		site {
			siteMetadata {
				title
				titleTemplate
				description
				siteUrl
				image
				keywords
				themeColor
				lang
			}
		}
		datoCmsSite {
			faviconMetaTags {
				...GatsbyDatoCmsFaviconMetaTags
			}
			globalSeo {
				facebookPageUrl
				fallbackSeo {
					title
					twitterCard
					description
					image {
						url
					}
				}
				siteName
				twitterAccount
				titleSuffix
			}
		}
	}
`
