const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)
const helpers_collections = require("./helpers")

// ************
// controller
// ************

const collections_get = async (req, res) => {
	try {
		const collections = await datocms.items.all({
			filter: {
				type: String(helpers_collections.COLLECTION_MODEL_ID),
			},
		})
		return res.status(200).json({ collections })
	} catch (err) {
		console.error(err)
		return res.status(500).send("Internal server error")
	}
}

// ************
// controller
// ************

const collection_create = async (req, res) => {
	const { body } = req
	// console.log("req.body:", req.body) // ? debug
	// res.status(200).send("OK") // ? debug

	try {
		// 1 - check if collection exists in DatoCMS
		const existingCollection = await helpers_collections.getCollection(body)

		// 2 - check if collection exists on DatoCMS
		if (existingCollection) {
			console.log("...collection found.  Cancel creation.") // ? debug

			// 2a - return duplicate error
			return res
				.status(409)
				.send(
					"Collection title already exists on DatoCMS.  Slug and ShopifyID must be unique.",
				)
		} else {
			console.log("...collection NOT found.  Creating collection...") // ? debug

			// 2b - create collection on DatoCMS
			await helpers_collections.createCollection(body)
			return res.status(200).send("Collection created on DatoCMS.")
		}
	} catch (err) {
		console.error(err)
		return res.status(500).send("Internal server error")
	}
}

// ************
// controller
// ************

const collection_update = async (req, res) => {
	const { body } = req
	// console.log("req.body:", req.body) // ? debug
	// res.status(200).send("OK") // ? debug

	try {
		// 1 - check if collection exists on DatoCMS
		const existingCollection = await helpers_collections.getCollection(body)

		// 2 - if collection exists
		if (existingCollection) {
			console.log("...collection found.  Updating collection...") // ? debug

			// 2a - update collection on DatoCMS
			await datocms.items.update(existingCollection.id, {
				shopifyId: String(body.id), // API specifies string
				title: body.title,
				description: body.body_html,
				slug: body.handle,
			})

			return res.status(200).send("Collection updated on DatoCMS.")
		} else {
			console.log("...collection NOT found.  Creating collection...") // ? debug

			// 2b - create collection on DatoCMS
			await helpers_collections.createCollection(body)
			return res.status(200).send("Collection created on DatoCMS.")
		}
	} catch (error) {
		console.error(error)
		return res.status(500).send("Internal server error")
	}
}

// ************
// controller
// ************

const collection_delete = async (req, res) => {
	const { body } = req
	// console.log("req.body:", req.body) // ? debug
	// res.status(200).send("OK") // ? debug

	try {
		// 1 - check if collection exists on DatoCMS
		const existingCollection = await helpers_collections.getCollection_byShopifyID(
			body,
		)
		console.log("...Collection found.  Deleting collection from DatoCMS...") // ? debug

		await datocms.items.destroy(String(existingCollection.id)) // API specifies string
		console.log(
			`Collection deleted.`,
			`Shopify ID: ${body.id}`,
			`DatoCMS ID: ${existingCollection.id}`,
		) // ? debug

		return res
			.status(200)
			.send(
				`Collection deleted.`,
				`Shopify ID: ${body.id}`,
				`DatoCMS ID: ${existingCollection.id}`,
			)
	} catch (error) {
		console.error(error)
		return res.status(404).send("Record not found.")
	}
}

module.exports = {
	collections_get,
	collection_create,
	collection_update,
	collection_delete,
}
