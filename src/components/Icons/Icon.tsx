import React, { ReactElement, ReactNode } from "react"
import SVG from "react-inlinesvg"

// import icons (from icons folder - local file system)
const back = require("./back.svg") as string
const backArrow = require("./left-arrow.svg") as string
const backArrowFull = require("./left.svg") as string
const cart = require("./cart-checkered.svg") as string
const cartZoom = require("./cart-zoom.svg") as string
const email = require("./envelope-neat.svg") as string
const instagram = require("./instagram-simple.svg") as string
const facebook = require("./facebook.svg") as string
const globe = require("./globe.svg") as string
const message = require("./smartphone-text.svg") as string
const messenger = require("./messenger-rect.svg") as string
const pencil = require("./pencil.svg") as string
const phone = require("./phone-ring.svg") as string
const send = require("./forward.svg") as string
const tea = require("./tea.svg") as string
const upArrow = require("./up-arrow.svg") as string
const upChevron = require("./up-chevron.svg") as string
const upChevronDouble = require("./up-chevron-double.svg") as string

// ************
// types
// ************

export interface Icon_I {
  name: string
  className?: string
  onClick?: () => void
}

// ************
// component
// ************

export default function Icon(props: Icon_I): ReactElement | null {
  switch (props.name) {
    case "back":
      return <SVG src={back} {...props} />
    case "back-arrow":
      return <SVG src={backArrow} {...props} />
    case "back-arrow-full":
      return <SVG src={backArrowFull} {...props} />
    case "cart":
      return <SVG src={cart} {...props} />
    case "cart-zoom":
      return <SVG src={cartZoom} {...props} />
    case "email":
      return <SVG src={email} {...props} />
    case "facebook":
      return <SVG src={facebook} {...props} />
    case "instagram":
      return <SVG src={instagram} {...props} />
    case "location":
      return <SVG src={globe} {...props} />
    case "message":
      return <SVG src={message} {...props} />
    case "messenger":
      return <SVG src={messenger} {...props} />
    case "pencil":
      return <SVG src={pencil} {...props} />
    case "phone":
      return <SVG src={phone} {...props} />
    case "send":
      return <SVG src={send} {...props} />
    case "tea":
      return <SVG src={tea} {...props} />
    case "up-arrow":
      return <SVG src={upArrow} {...props} />
    case "up-chevron":
      return <SVG src={upChevron} {...props} />
    case "up-chevron-double":
      return <SVG src={upChevronDouble} {...props} />
    default:
      return null
  }
}
