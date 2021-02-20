import { useEffect, useState } from "react"

// ************
// types
// ************

export interface WindowResize_I {
  height: number
  width: number
}

// ************
// hook
// ************

export const useWindowResize = (): WindowResize_I => {
  const [windowSize, setWindowSize] = useState<WindowResize_I>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const handleResize = (): void => {
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
