import path from "path"
import fs from "fs"
import fetch from "node-fetch"
import "dotenv/config"

import { SiteClient } from "datocms-client"
const client = new SiteClient(process.env.DATOCMS_API_TOKEN)

async function main() {
	console.log("Downloading records...") // ? debug

	try {
		const root = process.env.HOME || process.env.USERPROFILE
		const downloads = path.join(root, "downloads")
		const datocms = path.join(downloads, "datocms")
		const mathe = path.join(datocms, "mathe")

		!fs.existsSync(datocms) && fs.mkdirSync(datocms)
		!fs.existsSync(mathe) && fs.mkdirSync(mathe)

		const uploads = await client.uploads.all({}, { allPages: true })
		const getAsset = async (upload) => {
			console.log(`Downloading ${upload.url}...`) // ? debug
			const asset = await fetch(upload.url)
			const stream = fs.createWriteStream(
				path.join(mathe, path.basename(upload.filename)),
			)

			return new Promise((resolve, reject) => {
				asset.body.pipe(stream)
				asset.body.on("error", reject)
				stream.on("finish", resolve)
			})
		}

		// reduce chains together promise declarations followed by getAsset calls
		uploads.reduce(async (chain, upload) => {
			await chain
			return await getAsset(upload)
		}, Promise.resolve())
	} catch (error) {
		console.error(error) // ? debug
	}
}

main()
