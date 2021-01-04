import React, { useEffect, useState } from "react"

// ************
// component
// ************

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <>{children}</>
}

ClientOnly.propTypes = {}

export default ClientOnly
