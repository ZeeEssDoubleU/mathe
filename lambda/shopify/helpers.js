const sanitizeHtml = require("sanitize-html")

// ************
// helper
// ************

function trimEmptyTags(string) {
	// console.log("string:", string) // ? debug

	const trimmed = sanitizeHtml(string, {
		exclusiveFilter: (frame) => !frame.text.trim(),
	})

	// console.log("trimmed:", trimmed) // ? debug

	return trimmed
}

module.exports = {
	trimEmptyTags,
}
