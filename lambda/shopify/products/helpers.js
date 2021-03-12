const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)

// ************
// helper
// ************

const product_modelID = 148325

// ************
// helper
// ************

async function getProduct(body) {
	const existingProduct = await getProduct_bySlug(body)

	// if no existing product found
	if (!existingProduct) {
		return await getProduct_byShopifyID(body)
	}

	return existingProduct
}

// ************
// helper
// ************

async function getProduct_bySlug(body) {
	console.log("searching for product on DatoCMS by slug...") // ? debug

	const [existingProduct] = await datocms.items.all({
		filter: {
			type: String(product_modelID), // model ID from DatoCMS
			fields: {
				slug: {
					eq: body.handle, // handle from Shopify
				},
			},
		},
	})
	return existingProduct
}

// ************
// helper
// ************

async function getProduct_byShopifyID(body) {
	console.log("searching for product on DatoCMS by Shopify ID...") // ? debug

	const [existingProduct] = await datocms.items.all({
		filter: {
			type: String(product_modelID), // model ID from DatoCMS
			fields: {
				shopifyId: {
					eq: body.id, // id from Shopify
				},
			},
		},
	})
	return existingProduct
}

// ************
// helper
// ************

async function createProduct(body) {
	console.log("creating product on DatoCMS...") // ? debug

	const res = await datocms.items.create({
		itemType: String(product_modelID), // API specifies string
		active: body.status === "active" ? true : false,
		shopifyId: String(body.id), // API specifies string
		title: body.title,
		subtitle: null,
		description: null,
		price: null, // TODO: remove
		weight: null, // TODO: remove
		categories: null,
		image: null,
		grade: null,
		ingredients: null,
		slug: body.handle,
	})

	console.log("...product created") // ? debug
	return res
}

module.exports = {
	product_modelID,
	getProduct,
	getProduct_bySlug,
	getProduct_byShopifyID,
	createProduct,
}