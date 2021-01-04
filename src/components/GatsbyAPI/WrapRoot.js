import React from "react"
// import providers
import { ThemeProvider } from "styled-components"
// import styles
import ResetStyle from "../../styles/reset"
import GlobalStyle from "../../styles/global"
import { theme } from "../../styles/theme"

// ************
// component
// ************

export default ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle />
      {element}
    </ThemeProvider>
  )
}
