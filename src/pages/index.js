import React, { useEffect } from "react"
// import components
import SEO from "../components/SEO"

// ************
// component
// ************

const App = () => {
  // let the document know when mouse is being used
  useEffect(() => {
    document.body.addEventListener("mousedown", () => {
      document.body.classList.add("using-mouse")
    })
    document.body.addEventListener("keydown", () => {
      document.body.classList.remove("using-mouse")
    })
  }, [])

  return <SEO />
}
export default App
