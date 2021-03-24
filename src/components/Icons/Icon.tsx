import React, { ReactElement } from "react"
import SVG from "react-inlinesvg"

// import icons (from icons folder - local file system)
import back from "./back.svg"
import backArrow from "./left.svg"
import backChevron from "./left-chevron.svg"
import cart from "./cart-checkered.svg"
import cartZoom from "./cart-zoom.svg"
import email from "./envelope-neat.svg"
import instagram from "./instagram-simple.svg"
import facebook from "./facebook.svg"
import forwardArrow from "./right.svg"
import forwardChevron from "./right-chevron.svg"
import globe from "./globe.svg"
import message from "./smartphone-text.svg"
import messenger from "./messenger-rect.svg"
import minus from "./minus.svg"
import plus from "./plus.svg"
import pencil from "./pencil.svg"
import phone from "./phone-ring.svg"
import send from "./forward.svg"
import tea from "./tea.svg"
import trashcan from "./trashcan.svg"
import upArrow from "./up-arrow.svg"
import upChevron from "./up-chevron.svg"
import upChevronDouble from "./up-chevron-double.svg"

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
		case "back-chevron":
			return <SVG src={backChevron} {...props} />
		case "cart":
			return <SVG src={cart} {...props} />
		case "cart-zoom":
			return <SVG src={cartZoom} {...props} />
		case "email":
			return <SVG src={email} {...props} />
		case "facebook":
			return <SVG src={facebook} {...props} />
		case "forward-arrow":
			return <SVG src={forwardArrow} {...props} />
		case "forward-chevron":
			return <SVG src={forwardChevron} {...props} />
		case "instagram":
			return <SVG src={instagram} {...props} />
		case "location":
			return <SVG src={globe} {...props} />
		case "message":
			return <SVG src={message} {...props} />
		case "messenger":
			return <SVG src={messenger} {...props} />
		case "minus":
			return <SVG src={minus} {...props} />
		case "pencil":
			return <SVG src={pencil} {...props} />
		case "phone":
			return <SVG src={phone} {...props} />
		case "plus":
			return <SVG src={plus} {...props} />
		case "send":
			return <SVG src={send} {...props} />
		case "tea":
			return <SVG src={tea} {...props} />
		case "trashcan":
			return <SVG src={trashcan} {...props} />
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
