const serverless = require("serverless-http")
const express = require("express")
const bodyParser = require("body-parser")

// import controllers
const controllers_collections = require("./sync/collections")
const controllers_products = require("./sync/products")

// initializations
const app = express()
const router = express.Router()

// middleware
app.use(bodyParser.json())

// routes
router.get(`/`, async (req, res) => {
	res.status(200).send(`Shopify functions awaiting data.`)
})
router.get(`/sync`, async (req, res) => {
	res.status(200).send(`Shopify sync awaiting data.`)
})
router.get("/sync/collections", controllers_collections.collections_get)
router.post("/sync/collections", controllers_collections.collection_create)
router.get("/sync/products", controllers_products.products_get)
router.post("/sync/products", controllers_products.product_create)
router.post("/sync/products/update", controllers_products.product_update)
router.post("/sync/products/delete", controllers_products.product_delete)

// use routes
const base_url = `/.netlify/functions/shopify`
app.use(base_url, router)

// export module
module.exports = {
	handler: serverless(app),
}
