import React, { ReactElement } from "react"
import SVG from "react-inlinesvg"

// import icons (from icons folder - local file system)
import Back from "./icons/back.svg"
import BackArrow from "./icons/left.svg"
import BackChevron from "./icons/left-chevron.svg"
import Cart from "./icons/cart-checkered.svg"
import CartZoom from "./icons/cart-zoom.svg"
import Email from "./icons/envelope-neat.svg"
import Instagram from "./icons/instagram-simple.svg"
import Facebook from "./icons/facebook.svg"
import ForwardArrow from "./icons/right.svg"
import ForwardChevron from "./icons/right-chevron.svg"
import Globe from "./icons/globe.svg"
import Message from "./icons/smartphone-text.svg"
import Messenger from "./icons/messenger-rect.svg"
import Minus from "./icons/minus.svg"
import Plus from "./icons/plus.svg"
import Pencil from "./icons/pencil.svg"
import Phone from "./icons/phone-ring.svg"
import Send from "./icons/forward.svg"
import Tea from "./icons/tea.svg"
import Trashcan from "./icons/trashcan.svg"
import UpArrow from "./icons/up-arrow.svg"
import UpChevron from "./icons/up-chevron.svg"
import UpChevronDouble from "./icons/up-chevron-double.svg"
// import {ReactComponent as shopify } icons
import CardAmex from "./icons/shopify/card-amex.svg"
import CardDinersClub from "./icons/shopify/card-dinersclub.svg"
import CardDiscover from "./icons/shopify/card-discover.svg"
import CardElo from "./icons/shopify/card-elo.svg"
import CardJcb from "./icons/shopify/card-jcb.svg"
import CardMastercard from "./icons/shopify/card-mastercard.svg"
import CardVisa from "./icons/shopify/card-visa.svg"
import WalletApplePay from "./icons/shopify/wallet-applypay.svg"
import WalletGooglePay from "./icons/shopify/wallet-googlepay.svg"
import WalletShopifyPay from "./icons/shopify/wallet-shopifypay.svg"

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
	switch (props.name) {
		case "back":
			return <SVG src={Back} {...props} />
		case "back-arrow":
			return <SVG src={BackArrow} {...props} />
		case "back-chevron":
			return <SVG src={BackChevron} {...props} />
		case "cart":
			return <SVG src={Cart} {...props} />
		case "cart-zoom":
			return <SVG src={CartZoom} {...props} />
		case "email":
			return <SVG src={Email} {...props} />
		case "facebook":
			return <SVG src={Facebook} {...props} />
		case "forward-arrow":
			return <SVG src={ForwardArrow} {...props} />
		case "forward-chevron":
			return <SVG src={ForwardChevron} {...props} />
		case "instagram":
			return <SVG src={Instagram} {...props} />
		case "location":
			return <SVG src={Globe} {...props} />
		case "message":
			return <SVG src={Message} {...props} />
		case "messenger":
			return <SVG src={Messenger} {...props} />
		case "minus":
			return <SVG src={Minus} {...props} />
		case "pencil":
			return <SVG src={Pencil} {...props} />
		case "phone":
			return <SVG src={Phone} {...props} />
		case "plus":
			return <SVG src={Plus} {...props} />
		case "send":
			return <SVG src={Send} {...props} />
		case "tea":
			return <SVG src={Tea} {...props} />
		case "trashcan":
			return <SVG src={Trashcan} {...props} />
		case "up-arrow":
			return <SVG src={UpArrow} {...props} />
		case "up-chevron":
			return <SVG src={UpChevron} {...props} />
		case "up-chevron-double":
			return <SVG src={UpChevronDouble} {...props} />
		// ! shopify payments
		case "visa":
			return <SVG src={CardVisa} {...props} />
		case "mastercard":
			return <SVG src={CardMastercard} {...props} />
		case "american_express":
			return <SVG src={CardAmex} {...props} />
		case "discover":
			return <SVG src={CardDiscover} {...props} />
		case "elo":
			return <SVG src={CardElo} {...props} />
		case "jcb":
			return <SVG src={CardJcb} {...props} />
		case "diners_club":
			return <SVG src={CardDinersClub} {...props} />
		case "shopify_pay":
			return <SVG src={WalletShopifyPay} {...props} />
		case "apple_pay":
			return <SVG src={WalletApplePay} {...props} />
		case "google_pay":
			return <SVG src={WalletGooglePay} {...props} />
		default:
			return null
	}
}
