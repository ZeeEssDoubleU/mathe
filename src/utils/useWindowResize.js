import { useEffect, useState } from "react"

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }

  // effect adds eventlistener on mount and unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.addEventListener("resize", handleResize)
  }, [])

  return windowSize
}
