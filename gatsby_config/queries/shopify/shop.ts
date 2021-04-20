export default `
   query GetShop {
      shop {
         name
         description
         moneyFormat
         paymentSettings {
            acceptedCardBrands
            supportedDigitalWallets
         }
      }
   }
`
