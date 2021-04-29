import React, { ReactElement } from "react"
import loadable from "@loadable/component"

// import icons (from icons folder - local file system)
const Back = loadable.lib(() => import("./icons/back.svg"))
const BackArrow = loadable.lib(() => import("./icons/left.svg"))
const BackChevron = loadable.lib(() => import("./icons/left-chevron.svg"))
const Cart = loadable.lib(() => import("./icons/cart-checkered.svg"))
const CartZoom = loadable.lib(() => import("./icons/cart-zoom.svg"))
const Email = loadable.lib(() => import("./icons/envelope-neat.svg"))
const Instagram = loadable.lib(() => import("./icons/instagram-simple.svg"))
const Facebook = loadable.lib(() => import("./icons/facebook.svg"))
const ForwardArrow = loadable.lib(() => import("./icons/right.svg"))
const ForwardChevron = loadable.lib(() => import("./icons/right-chevron.svg"))
const Globe = loadable.lib(() => import("./icons/globe.svg"))
const Message = loadable.lib(() => import("./icons/smartphone-text.svg"))
const Messenger = loadable.lib(() => import("./icons/messenger-rect.svg"))
const Minus = loadable.lib(() => import("./icons/minus.svg"))
const Plus = loadable.lib(() => import("./icons/plus.svg"))
const Pencil = loadable.lib(() => import("./icons/pencil.svg"))
const Phone = loadable.lib(() => import("./icons/phone-ring.svg"))
const Send = loadable.lib(() => import("./icons/forward.svg"))
const Tea = loadable.lib(() => import("./icons/tea.svg"))
const Trashcan = loadable.lib(() => import("./icons/trashcan.svg"))
const UpArrow = loadable.lib(() => import("./icons/up-arrow.svg"))
const UpChevron = loadable.lib(() => import("./icons/up-chevron.svg"))
const UpChevronDouble = loadable.lib(
	() => import("./icons/up-chevron-double.svg"),
)
// import {ReactComponent as shopify } icons
const CardAmex = loadable.lib(() => import("./icons/shopify/card-amex.svg"))
const CardDinersClub = loadable.lib(
	() => import("./icons/shopify/card-dinersclub.svg"),
)
const CardDiscover = loadable.lib(
	() => import("./icons/shopify/card-discover.svg"),
)
const CardElo = loadable.lib(() => import("./icons/shopify/card-elo.svg"))
const CardJcb = loadable.lib(() => import("./icons/shopify/card-jcb.svg"))
const CardMastercard = loadable.lib(
	() => import("./icons/shopify/card-mastercard.svg"),
)
const CardVisa = loadable.lib(() => import("./icons/shopify/card-visa.svg"))
const WalletApplePay = loadable.lib(
	() => import("./icons/shopify/wallet-applypay.svg"),
)
const WalletGooglePay = loadable.lib(
	() => import("./icons/shopify/wallet-googlepay.svg"),
)
const WalletShopifyPay = loadable.lib(
	() => import("./icons/shopify/wallet-shopifypay.svg"),
)

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
	const SVGContent = ({ ReactComponent }: typeof import("*.svg")) => (
		<ReactComponent />
	)

	switch (props.name) {
		case "back":
			return <Back {...props}>{SVGContent}</Back>
		case "back-arrow":
			return <BackArrow {...props}>{SVGContent}</BackArrow>
		case "back-chevron":
			return <BackChevron {...props}>{SVGContent}</BackChevron>
		case "cart":
			return <Cart {...props}>{SVGContent}</Cart>
		case "cart-zoom":
			return <CartZoom {...props}>{SVGContent}</CartZoom>
		case "email":
			return <Email {...props}>{SVGContent}</Email>
		case "facebook":
			return <Facebook {...props}>{SVGContent}</Facebook>
		case "forward-arrow":
			return <ForwardArrow {...props}>{SVGContent}</ForwardArrow>
		case "forward-chevron":
			return <ForwardChevron {...props}>{SVGContent}</ForwardChevron>
		case "instagram":
			return <Instagram {...props}>{SVGContent}</Instagram>
		case "location":
			return <Globe {...props}>{SVGContent}</Globe>
		case "message":
			return <Message {...props}>{SVGContent}</Message>
		case "messenger":
			return <Messenger {...props}>{SVGContent}</Messenger>
		case "minus":
			return <Minus {...props}>{SVGContent}</Minus>
		case "pencil":
			return <Pencil {...props}>{SVGContent}</Pencil>
		case "phone":
			return <Phone {...props}>{SVGContent}</Phone>
		case "plus":
			return <Plus {...props}>{SVGContent}</Plus>
		case "send":
			return <Send {...props}>{SVGContent}</Send>
		case "tea":
			return <Tea {...props}>{SVGContent}</Tea>
		case "trashcan":
			return <Trashcan {...props}>{SVGContent}</Trashcan>
		case "up-arrow":
			return <UpArrow {...props}>{SVGContent}</UpArrow>
		case "up-chevron":
			return <UpChevron {...props}>{SVGContent}</UpChevron>
		case "up-chevron-double":
			return <UpChevronDouble {...props}>{SVGContent}</UpChevronDouble>
		// ! shopify payments
		case "visa":
			return <CardVisa {...props}>{SVGContent}</CardVisa>
		case "mastercard":
			return <CardMastercard {...props}>{SVGContent}</CardMastercard>
		case "american_express":
			return <CardAmex {...props}>{SVGContent}</CardAmex>
		case "discover":
			return <CardDiscover {...props}>{SVGContent}</CardDiscover>
		case "elo":
			return <CardElo {...props}>{SVGContent}</CardElo>
		case "jcb":
			return <CardJcb {...props}>{SVGContent}</CardJcb>
		case "diners_club":
			return <CardDinersClub {...props}>{SVGContent}</CardDinersClub>
		case "shopify_pay":
			return <WalletShopifyPay {...props}>{SVGContent}</WalletShopifyPay>
		case "apple_pay":
			return <WalletApplePay {...props}>{SVGContent}</WalletApplePay>
		case "google_pay":
			return <WalletGooglePay {...props}>{SVGContent}</WalletGooglePay>
		default:
			return null
	}
}