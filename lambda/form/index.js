const serverless = require("serverless-http")
const express = require("express")
const bodyParser = require("body-parser")

// initializations
const app = express()
const router = express.Router()

// middleware
app.use(bodyParser.json())

// routes
router.get(`/`, async (req, res) => {
	res.status(200).send(`Awaiting form submissions.`)
})
router.post("/", async (req, res) => {
	res.status(200).send("Form submission recieved!")
})

// use routes
const base_url = `/.netlify/functions/form`
app.use(base_url, router)

// export module
module.exports = {
	handler: serverless(app),
}
