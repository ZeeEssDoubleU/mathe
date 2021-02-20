// @ts-nocheck
import React, { memo } from "react"

// ************
// types
// ************

export interface ExternalLink_I {
  href: string
  email?: boolean
  phone?: boolean
  address?: boolean
  facebook?: boolean
  instagram?: boolean
}

// ************
// component
// ************

function ExternalLink(props: ExternalLink_I): ReactElement {
  let target = props.href.toLowerCase()
  if (props.email) {
    target = `mailto: ${target}`
  } else if (props.phone) {
    target = `tel: ${target}`
  } else if (props.address) {
    target = `http://maps.google.com/?q=${target}`
  }

  let display = props.href
  if (props.facebook || props.instagram) {
    display = display.replace("https://www.", "")
  }

  return (
    <a href={target} rel="_blank" target="noopener noreferrer">
      {display}
    </a>
  )
}
export default memo(ExternalLink)
