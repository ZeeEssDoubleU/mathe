export function isEmpty(str: string) {
	return (
		!str ||
		str.length === 0 ||
		str === "" ||
		str === null ||
		str === undefined
	)
}
