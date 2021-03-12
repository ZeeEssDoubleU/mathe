const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)

// ************
// controller
// ************

const products_get = async (req, res) => {
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
}

// ************
// controller
// ************

const product_create = async (req, res) => {
	const { headers, body } = req

	console.log("req.headers:", req.headers)
	console.log("req.body:", req.body)

	try {
		// 1 - check if product exists in DatoCMS
		const [existingProduct] = await datocms.items.all({
			filter: {
				// The Model ID retrieved from Dato CMS
				type: 148325,
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
						itemtype: 148325,
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

// ************
// controller
// ************

const product_update = async (req, res) => {
	const { body } = req
	console.log("req.body:", body)

	// 1 - check if product exists in DatoCMS
	const [existingProduct] = await datocms.items.all({
		filter: {
			// The Model ID retrieved from Dato CMS
			type: 148325,
			fields: {
				title: { eq: body.title },
			},
		},
	})

	console.log("existingProduct:", existingProduct) // ? debug

	try {
		// 2 - update product on DatoCMS
		if (existingProduct) {
			await datocms.items.update(existingProduct.id, {
				active: body.status === "active" ? true : false,
				productId: String(body.id),
				title: body.title,
				slug: body.handle,
			})
		}
	} catch (error) {
		console.error(error)
		return res.status(500).send("Internal server error")
	}
}

// ************
// controller
// ************

const product_delete = async (req, res) => {
	const { body } = req
	console.log("req.body:", body)

	// try {
	// 	// 2 - update product on DatoCMS
	// 	if (existingProduct) {
	// 		await datocms.items.update(existingProduct.id, {
	// 			active: body.status === "active" ? true : false,
	// 			productId: String(body.id),
	// 			title: body.title,
	// 			slug: body.handle,
	// 		})
	// 	}
	// } catch (error) {
	// 	console.error(error)
	// 	return res.status(500).send("Internal server error")
	// }
}

module.exports = {
	products_get,
	product_create,
	product_update,
}
