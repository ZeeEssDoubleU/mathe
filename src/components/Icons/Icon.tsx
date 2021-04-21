import React, { ReactElement } from "react"
import loadable from "@loadable/component"

// import icons (from icons folder - local file system)
const Back = loadable.lib(() => import("./back.svg"))
const BackArrow = loadable.lib(() => import("./left.svg"))
const BackChevron = loadable.lib(() => import("./left-chevron.svg"))
const Cart = loadable.lib(() => import("./cart-checkered.svg"))
const CartZoom = loadable.lib(() => import("./cart-zoom.svg"))
const Email = loadable.lib(() => import("./envelope-neat.svg"))
const Instagram = loadable.lib(() => import("./instagram-simple.svg"))
const Facebook = loadable.lib(() => import("./facebook.svg"))
const ForwardArrow = loadable.lib(() => import("./right.svg"))
const ForwardChevron = loadable.lib(() => import("./right-chevron.svg"))
const Globe = loadable.lib(() => import("./globe.svg"))
const Message = loadable.lib(() => import("./smartphone-text.svg"))
const Messenger = loadable.lib(() => import("./messenger-rect.svg"))
const Minus = loadable.lib(() => import("./minus.svg"))
const Plus = loadable.lib(() => import("./plus.svg"))
const Pencil = loadable.lib(() => import("./pencil.svg"))
const Phone = loadable.lib(() => import("./phone-ring.svg"))
const Send = loadable.lib(() => import("./forward.svg"))
const Tea = loadable.lib(() => import("./tea.svg"))
const Trashcan = loadable.lib(() => import("./trashcan.svg"))
const UpArrow = loadable.lib(() => import("./up-arrow.svg"))
const UpChevron = loadable.lib(() => import("./up-chevron.svg"))
const UpChevronDouble = loadable.lib(() => import("./up-chevron-double.svg"))
// import {ReactComponent as shopify } icons
const CardAmex = loadable.lib(() => import("./shopify/card-amex.svg"))
const CardDinersClub = loadable.lib(
	() => import("./shopify/card-dinersclub.svg"),
)
const CardDiscover = loadable.lib(() => import("./shopify/card-discover.svg"))
const CardElo = loadable.lib(() => import("./shopify/card-elo.svg"))
const CardJcb = loadable.lib(() => import("./shopify/card-jcb.svg"))
const CardMastercard = loadable.lib(
	() => import("./shopify/card-mastercard.svg"),
)
const CardVisa = loadable.lib(() => import("./shopify/card-visa.svg"))
const WalletApplePay = loadable.lib(
	() => import("./shopify/wallet-applypay.svg"),
)
const WalletGooglePay = loadable.lib(
	() => import("./shopify/wallet-googlepay.svg"),
)
const WalletShopifyPay = loadable.lib(
	() => import("./shopify/wallet-shopifypay.svg"),
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
