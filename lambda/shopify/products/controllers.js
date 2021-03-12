const { SiteClient } = require("datocms-client")
const datocms = new SiteClient(process.env.DATOCMS_API_TOKEN)
const helpers_products = require("./helpers")

// TODO: remove fields from datoCMS
// price
// weight
// grade
// categories ???

// ************
// controller
// ************

const products_get = async (req, res) => {
	try {
		const items = await datocms.items.all({
			filter: {
				type: String(helpers_products.product_modelID),
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
	const { body } = req
	// console.log("req.body:", req.body) // ? debug

	try {
		// 1 - check if product exists in DatoCMS
		const existingProduct = await helpers_products.getProduct(body)

		// 2 - check if product exists on DatoCMS
		if (existingProduct) {
			console.log("...product found.  Cancel creation.") // ? debug

			// 2a - return duplicate error
			return res
				.status(409)
				.send("Product title already exists on DatoCMS.  Must be unique.")
		} else {
			console.log("...product NOT found.  Creating product...") // ? debug

			// 2b - create product on DatoCMS
			await helpers_products.createProduct(body)
			return res.status(200).send("Product created on DatoCMS.")
		}
	} catch (err) {
		console.error(err)
		return res.status(500).send("Internal server error")
	}
}

// ************
// controller
// ************

const product_update = async (req, res) => {
	const { body } = req
	console.log("req.body:", req.body) // ? debug

	try {
		// 1 - check if product exists on DatoCMS
		const existingProduct = await helpers_products.getProduct(body)

		// 2 - if product exists
		if (existingProduct) {
			console.log("...product found.  Updating product...") // ? debug

			// 2a - update product on DatoCMS
			await datocms.items.update(existingProduct.id, {
				active: body.status === "active" ? true : false,
				shopifyId: String(body.id), // API specifies string
				title: body.title,
				description: body.body_html,
				slug: body.handle,
			})

			return res.status(200).send("Product updated on DatoCMS.")
		} else {
			console.log("...product NOT found.  Creating product...") // ? debug

			// 2b - create product on DatoCMS
			await helpers_products.createProduct(body)
			return res.status(200).send("Product created on DatoCMS.")
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
	// console.log("req.body:", req.body) // ? debug

	try {
		// 1 - check if product exists on DatoCMS
		const existingProduct = await helpers_products.getProduct_byShopifyID(
			body,
		)
		console.log("...Product found.  Deleting product from DatoCMS...") // ? debug

		await datocms.items.destroy(String(existingProduct.id)) // API specifies string
		console.log(
			`Product deleted.`,
			`Shopify ID: ${body.id}`,
			`DatoCMS ID: ${existingProduct.id}`,
		) // ? debug

		return res
			.status(200)
			.send(
				`Product deleted.`,
				`Shopify ID: ${body.id}`,
				`DatoCMS ID: ${existingProduct.id}`,
			)
	} catch (error) {
		console.error(error)
		return res.status(404).send("Record not found.")
	}
}

module.exports = {
	products_get,
	product_create,
	product_update,
	product_delete,
}
