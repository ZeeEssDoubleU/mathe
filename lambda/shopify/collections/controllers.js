const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)

// ************
// controller
// ************

const collections_get = async (req, res) => {
	try {
		const items = await datocms.items.all({
			filter: {
				type: 148325,
			},
		})
		return res.status(200).json({ items })
	} catch (err) {
		console.error(err)
		return res.status(500).send("Internal server error")
	}

	// res.status(200).send("Shopify sync function is awaiting data.")
}

// ************
// controller
// ************

const collection_create = async (req, res) => {
	const { headers, body } = req

	console.log("req.headers:", req.headers)
	console.log("req.body:", req.body)

	try {
		// 1. Determine if the product exists in Dato CMS
		// And we destructure the first element (if found) in the filtered array
		const [existingProduct] = await datocms.items.all({
			filter: {
				// The Model ID retrieved from Dato CMS
				type: "529135",
				fields: {
					// Filter using the product ID from the webhooks data
					productId: {
						eq: String(body.id),
					},
				},
			},
		})
		// 2. Determine the type of operation and validate it
		// First, check if the product exists
		if (existingProduct) {
			// We can UPDATE and DELETE a product
			switch (headers["x-shopify-topic"]) {
				case "products/update":
					await datocms.items.update(existingProduct.id, {
						// We specify the fields to update and assign the new values
						title: body.title,
						price: body.price,
					})
					return res.status(200).send("OK")
				case "products/delete":
					await datocms.items.destroy(existingProduct.id)
					return res.status(200).send("OK")
				default:
					// Break out of the switch if the operation is invalid
					break
			}
		} else {
			// We can CREATE a product
			switch (headers["x-shopify-topic"]) {
				case "products/create":
					await datocms.items.create({
						// Create an item with the model ID as itemType and *ALL* fields
						itemType: "529135",
						title: body.title,
						productId: String(body.id),
						price: body.price,
					})
					return res.status(200).send("OK")
				default:
					// Break out of the switch if the operation is invalid
					break
			}
		}
	} catch (err) {
		console.error(err)
		return res.status(500).send("Internal server error")
	}

	// Catchall for invalid requests
	return res.status(400).send("Bad request")
}

module.exports = {
	collections_get,
	collection_create,
}
