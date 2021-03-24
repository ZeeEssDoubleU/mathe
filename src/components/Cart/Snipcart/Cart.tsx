// @ts-nocheck
import React, { ReactElement } from "react"
import { Helmet } from "react-helmet"

// ************
// component
// ************

export default function Cart(): ReactElement {
	const securedByUrl =
		"https://snipcart.com/security?utm_source=cart_referral&utm_medium=powered_by&utm_campaign=powered_by_ref&utm_term=mathetea.com"

	return (
		<>
			<Helmet>
				{/* preconnect to below scripts / links in gatsby-ssr */}
				{/* load CSS async */}
				{/* https://www.npmjs.com/package/fg-loadcss */}
				<link
					key="snipcart_style"
					rel="stylesheet"
					href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css"
					media="print"
					onLoad="this.media='all'"
				/>
				<script
					async
					key="snipcart_js"
					src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"
				/>
			</Helmet>
			<div
				hidden
				key="snipcart_div"
				id="snipcart"
				data-config-add-product-behavior="none"
				data-config-modal-style="side"
				data-api-key={process.env.GATSBY_SNIPCART_API_KEY}
			>
				<featured-payment-methods>
					<div className="snipcart-featured-payment-methods">
						<h3 className="snipcart__font--secondary snipcart__font--bold snipcart-featured-payment-methods__title">
							<a
								href={securedByUrl}
								className="snipcart-featured-payment-methods__link"
								target="_blank"
								rel="nofollow noopener noreferrer"
							>
								<icon
									name="lock"
									className="snipcart-featured-payment-methods__title-icon"
								></icon>
								Secured by Snipcart
							</a>
						</h3>
						<div className="snipcart-featured-payment-methods__list">
							{/* visa */}
							<li className="snipcart-featured-payment-methods__list-item">
								<icon
									name="card-visa"
									alt="Visa"
									className="snipcart__icon--brand"
								></icon>
							</li>
							{/* mastercard */}
							<li className="snipcart-featured-payment-methods__list-item">
								<icon
									name="card-mastercard"
									alt="Mastercard"
									className="snipcart__icon--brand"
								></icon>
							</li>
							{/* discover */}
							<li className="snipcart-featured-payment-methods__list-item">
								<icon
									name="card-discover"
									alt="Discover"
									className="snipcart__icon--brand"
								></icon>
							</li>
							{/* amex */}
							<li className="snipcart-featured-payment-methods__list-item">
								<icon
									name="card-amex"
									alt="American Express"
									className="snipcart__icon--brand"
								></icon>
							</li>
							{/* paypal */}
							<li className="snipcart-featured-payment-methods__list-item">
								<icon
									name="card-paypal"
									alt="Paypal Express"
									className="snipcart__icon--brand"
								></icon>
							</li>
						</div>
					</div>
				</featured-payment-methods>
			</div>
		</>
	)
}
