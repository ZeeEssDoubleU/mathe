export const abbreviate = (input: string): string => {
	switch (input) {
		case "GRAMS":
			return "g"
		case "KILOGRAMS":
			return "kg"
		case "OUNCES":
			return "oz"
		case "POUNDS":
			return "lb"
		default:
			return input
	}
}
