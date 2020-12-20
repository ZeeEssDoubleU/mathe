export const convertGrams = (amount, units) => {
  switch (units) {
    case "g":
      return parseInt(amount)
    case "kg":
      return parseInt(amount * 1000)
    case "oz":
      return parseInt(amount * 28.3495)
    case "lb":
      return parseInt(amount * 453.592)
    default:
      return parseInt(amount)
  }
}
