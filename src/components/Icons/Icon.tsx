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
// import shopify icons
import card_amex from "./shopify/card-amex.svg"
import card_dinersclub from "./shopify/card-dinersclub.svg"
import card_discover from "./shopify/card-discover.svg"
import card_elo from "./shopify/card-elo.svg"
import card_jcb from "./shopify/card-jcb.svg"
import card_mastercard from "./shopify/card-mastercard.svg"
import card_visa from "./shopify/card-visa.svg"
import wallet_applepay from "./shopify/wallet-applypay.svg"
import wallet_googlepay from "./shopify/wallet-googlepay.svg"
import wallet_shopifypay from "./shopify/wallet-shopifypay.svg"

// ************
// types
// ************

export interface Icon_I {
	name: string
	alt?: string
	className?: string
	onClick?: () => void
}

// ************
// component
// ************

export default function Icon(props: Icon_I): ReactElement | null {
	const alt = props.name.replace(/_|-/g, " ")

	switch (props.name) {
		case "back":
			return <SVG src={back} alt={alt} {...props} />
		case "back-arrow":
			return <SVG src={backArrow} alt={alt} {...props} />
		case "back-chevron":
			return <SVG src={backChevron} alt={alt} {...props} />
		case "cart":
			return <SVG src={cart} alt={alt} {...props} />
		case "cart-zoom":
			return <SVG src={cartZoom} alt={alt} {...props} />
		case "email":
			return <SVG src={email} alt={alt} {...props} />
		case "facebook":
			return <SVG src={facebook} alt={alt} {...props} />
		case "forward-arrow":
			return <SVG src={forwardArrow} alt={alt} {...props} />
		case "forward-chevron":
			return <SVG src={forwardChevron} alt={alt} {...props} />
		case "instagram":
			return <SVG src={instagram} alt={alt} {...props} />
		case "location":
			return <SVG src={globe} alt={alt} {...props} />
		case "message":
			return <SVG src={message} alt={alt} {...props} />
		case "messenger":
			return <SVG src={messenger} alt={alt} {...props} />
		case "minus":
			return <SVG src={minus} alt={alt} {...props} />
		case "pencil":
			return <SVG src={pencil} alt={alt} {...props} />
		case "phone":
			return <SVG src={phone} alt={alt} {...props} />
		case "plus":
			return <SVG src={plus} alt={alt} {...props} />
		case "send":
			return <SVG src={send} alt={alt} {...props} />
		case "tea":
			return <SVG src={tea} alt={alt} {...props} />
		case "trashcan":
			return <SVG src={trashcan} alt={alt} {...props} />
		case "up-arrow":
			return <SVG src={upArrow} alt={alt} {...props} />
		case "up-chevron":
			return <SVG src={upChevron} alt={alt} {...props} />
		case "up-chevron-double":
			return <SVG src={upChevronDouble} alt={alt} {...props} />
		// ! shopify payments
		case "visa":
			return <SVG src={card_visa} alt={alt} {...props} />
		case "mastercard":
			return <SVG src={card_mastercard} alt={alt} {...props} />
		case "american_express":
			return <SVG src={card_amex} alt={alt} {...props} />
		case "discover":
			return <SVG src={card_discover} alt={alt} {...props} />
		case "elo":
			return <SVG src={card_elo} alt={alt} {...props} />
		case "jcb":
			return <SVG src={card_jcb} alt={alt} {...props} />
		case "diners_club":
			return <SVG src={card_dinersclub} alt={alt} {...props} />
		case "shopify_pay":
			return <SVG src={wallet_shopifypay} alt={alt} {...props} />
		case "apple_pay":
			return <SVG src={wallet_applepay} alt={alt} {...props} />
		case "google_pay":
			return <SVG src={wallet_googlepay} alt={alt} {...props} />
		default:
			return null
	}
}
