import React from "react"
// import providers
import { StoreProvider } from "../../store/useStore"
// import components
import Layout from "../Layout/Layout"

// ************
// component
// ************

export default ({ element, props }) => {
  return (
    <StoreProvider {...props}>
      <Layout {...props}>{element}</Layout>
    </StoreProvider>
  )
}
