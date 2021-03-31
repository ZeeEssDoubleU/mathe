// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function serialize(input: unknown) {
	return JSON.parse(JSON.stringify(input))
}
