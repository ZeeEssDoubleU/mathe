import React, { ReactChild, ReactElement, useEffect, useState } from "react"

// ************
// types
// ************

export interface ClientOnly_I {
	children: ReactChild | ReactChild[]
}

// ************
// component
// ************

export default function ClientOnly({
	children,
}: ClientOnly_I): ReactElement | null {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) return null

	return <>{children}</>
}
