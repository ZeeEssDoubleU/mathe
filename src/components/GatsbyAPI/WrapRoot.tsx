import React, { ReactElement } from "react"
import { WrapRootElementBrowserArgs } from "gatsby"
// import providers
import { ThemeProvider } from "styled-components"
// import styles
import ResetStyle from "../../styles/reset"
import GlobalStyle from "../../styles/global"
import { theme } from "../../styles/theme"

// ************
// component
// ************

export default function WrapRoot({
  element,
}: WrapRootElementBrowserArgs): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle />
      {element}
    </ThemeProvider>
  )
}
