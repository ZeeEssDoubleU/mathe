import saveIcon from "../../src/utils/saveIcon"

// get and save favicon
const favicon = `favicon.svg`
export const faviconPath = `src/components/Icon/icons/${favicon}`
saveIcon("Favicon", favicon, faviconPath)

// get and save shareable favicon
const faviconShare = `favicon-share.svg`
export const faviconSharePath = `src/components/Icon/icons/${faviconShare}`
saveIcon("Favicon Share", faviconShare, faviconSharePath)
