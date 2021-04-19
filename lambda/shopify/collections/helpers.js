const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)
const { trimEmptyTags } = require("../helpers")

// constants
const COLLECTION_MODEL_ID = 185182

// ************
// helper
// ************

async function getCollection(body) {
	const existingCollection = await getCollection_bySlug(body)

	// if no existing collection found
	if (!existingCollection) {
		return await getCollection_byShopifyID(body)
	}

	return existingCollection
}

// ************
// helper
// ************

async function getCollection_bySlug(body) {
	console.log("searching for collection on DatoCMS by slug...") // ? debug

	const [existingCollection] = await datocms.items.all({
		filter: {
			type: String(COLLECTION_MODEL_ID), // model ID from DatoCMS
			fields: {
				slug: {
					eq: body.handle, // handle from Shopify
				},
			},
		},
	})
	return existingCollection
}

// ************
// helper
// ************

async function getCollection_byShopifyID(body) {
	console.log("searching for collection on DatoCMS by Shopify ID...") // ? debug

	const [existingCollection] = await datocms.items.all({
		filter: {
			type: String(COLLECTION_MODEL_ID), // model ID from DatoCMS
			fields: {
				shopifyId: {
					eq: body.id, // id from Shopify
				},
			},
		},
	})
	return existingCollection
}

// ************
// helper
// ************

async function createCollection(body) {
	console.log("creating collection on DatoCMS...") // ? debug

	const res = await datocms.items.create({
		itemType: String(COLLECTION_MODEL_ID), // API specifies string
		noNavDisplay: false,
		shopifyId: String(body.id), // API specifies string
		title: body.title,
		subtitle: null,
		navDisplay: body.title,
		tagDisplay: body.title,
		description: trimEmptyTags(body.body_html),
		images: null,
		slug: body.handle,
	})

	console.log(`...created collection: ${body.handle}`) // ? debug
	return res
}

// ************
// helper
// ************

async function updateCollection(existingCollection, body) {
	console.log("creating collection on DatoCMS...") // ? debug

	const res = await await datocms.items.update(existingCollection.id, {
		shopifyId: String(body.id), // API specifies string
		title: body.title,
		description: trimEmptyTags(body.body_html),
		slug: body.handle,
	})

	console.log(`...updated collection: ${body.handle}`) // ? debug
	return res
}

module.exports = {
	COLLECTION_MODEL_ID,
	getCollection,
	getCollection_bySlug,
	getCollection_byShopifyID,
	createCollection,
	updateCollection,
}
