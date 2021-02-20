export const convertGrams = (amount: number, units: string): number => {
  switch (units) {
    case "g":
      return amount
    case "kg":
      return amount * 1000
    case "oz":
      return amount * 28.3495
    case "lb":
      return amount * 453.592
    default:
      return amount
  }
}
