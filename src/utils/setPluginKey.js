// finds plugin in gatsby state and adjusts desired plugin key
// ! used as helper in gatsby-node lifecycle hooks
export default async function setPluginKey(
	state,
	selectedPlugin,
	setPluginStatus,
	key,
	value,
): void {
	try {
		const plugin = state.flattenedPlugins.find(
			(plugin) => plugin.name === selectedPlugin,
		)

		if (plugin) {
			const pluginOptions = {
				...plugin.pluginOptions,
				[key]: value,
			}
			await setPluginStatus({ pluginOptions }, plugin)
			console.log(`
            Plugin modified!
               plugin: ${selectedPlugin}   
               key: ${key}   
         `) // ? debug
		}
	} catch (error) {
		console.error(error) // ? debug
	}
}
