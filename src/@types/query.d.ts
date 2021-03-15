import { GatsbyImageFluidProps } from "gatsby-plugin-image"

export interface Page_I {
	page: {
		header: string
		subHeader: string
		medallion: {
			url: string
		}
	}
}
export interface Categories_I {
	categories: {
		nodes: {
			title: string
			subTitle: string
			displayName: string
			description: string
			noNavDisplay: boolean
			slug: string
			images: {
				imageGallery: GatsbyImageFluidProps[]
			}
		}[]
	}
}
export interface Products_I {
	products: {
		nodes: {
			id: string
			active: boolean
			title: string
			subtitle: string
			description: string
			categories: {
				slug: string
				title: string
			}[]
			price: number
			weight: {
				weight: string
				amount: number
				units: string
			}
			slug: string
		}[]
	}
}
