import React, { ReactElement } from "react"
import {
  WrapPageElementBrowserArgs,
  PageProps,
  WrapPageElementNodeArgs,
} from "gatsby"
// import providers
import { StoreProvider } from "../../store/useStore"
// import components
import Layout from "../Layout/Layout"

// ************
// types
// ************

// TODO: figure out alternative to any type.  Good news is that input is predictable
export interface WrapPage_I extends WrapPageElementBrowserArgs {
  element: any
}

// ************
// component
// ************

export default function WrapPage({ element, props }: WrapPage_I): ReactElement {
  return (
    <StoreProvider {...props}>
      <Layout {...props}>{element}</Layout>
    </StoreProvider>
  )
}
