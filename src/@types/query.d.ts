export interface Page_I {
	header: string
	subHeader: string
	medallion: {
		url: string
	}
}
export interface ProductsQuery_I {
	data: {
		page: Page_I
		allCollections_datocms: {
			nodes: {
				slug: string
				title: string
				navDisplay: string
				tagDisplay: string
				description: string
				noNavDisplay: boolean
			}[]
		}
		collection_datocms: {
			slug: string
			title: string
			subtitle: string
			navDisplay: string
			tagDisplay: string
			description: string
		}
		collection_shopify: {
			handle: string
			products: {
				handle: string
				title: string
				descriptionHtml: string
				productType: string
				tags: string[]
				variants: {
					weight: number
					weightUnit: string
					priceNumber: number
				}[]
			}[]
		}
		products_datocms: {
			nodes: {
				slug: string
				title: string
				subtitle: string
				description: string
			}[]
		}
	}
}
