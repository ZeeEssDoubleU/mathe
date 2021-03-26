import { DefaultTheme } from "styled-components"

// merge theme (below) to DefaultTheme
declare module "styled-components" {
	export interface DefaultTheme {
		color: {
			app_green: string
			app_green_partial: string
			app_lightGreen: string
			app_lightGreen_partial: string
			app_gold: string

			background: string
			accent_light: string
			disabled: string

			font_light: string
			font_dark: string
		}

		// elements that have multiple types (color, size, etc)
		element: {
			shadow: string
		}

		// z-index
		zIndex: {
			top: number
			mid: number
			bottom: number
		}

		// fonts
		font: {
			main: string
			main_weight: number
			main_weight_bold: number
			main_weight_heavy: number
			main_weight_header: number
			main_weight_subheader: number
			main_weight_sectionHeader: number
			main_weight_nav: number
			main_weight_link: number
			main_weight_cart: number

			accent: string
			accent_weight: number

			accent_cart: string
		}

		// media queries
		media: {
			// width
			mobile: string
			tablet: string
			desktop: string
			wide: string
			fullhd: string

			// height
			short: string
			med: string
			tall: string
			giant: string
		}

		// layout spacings
		spacing: {
			cart_padding: string
		}
	}
}

// declare theme
export const theme: DefaultTheme = {
	color: {
		app_green: "hsla(86, 48%, 48%, 1.0)",
		app_green_partial: "86, 48%, 48%",
		app_lightGreen: "hsla(88, 41%, 54%, 1.0)",
		app_lightGreen_partial: "88, 41%, 54%",
		app_gold: "hsla(43, 47%, 35%, 1.0)",

		background: "hsla(0, 0%, 0%, 0.85)",
		accent_light: "#F3F5F5",
		disabled: "#909291",

		font_light: "white",
		font_dark: "#313332",
	},

	// elements that have multiple types (color, size, etc)
	element: {
		shadow: "black 0 2px",
	},

	// z-index
	zIndex: {
		top: 99,
		mid: 49,
		bottom: 0,
	},

	// fonts
	font: {
		main: "Montserrat, Avenir, Arial, sans-serif",
		main_weight: 200,
		main_weight_bold: 300,
		main_weight_heavy: 500,
		main_weight_header: 400,
		main_weight_subheader: 300,
		main_weight_sectionHeader: 300,
		main_weight_nav: 400,
		main_weight_link: 400,
		main_weight_cart: 300,

		accent: "Merriweather, Garamond, serif",
		accent_weight: 300,

		accent_cart: "Open Sans, sans-serif",
	},

	// media queries
	media: {
		// width
		mobile: "320px",
		tablet: "768px",
		desktop: "1024px",
		wide: "1216px",
		fullhd: "1408px",

		// height
		short: "480px",
		med: "720px",
		tall: "960px",
		giant: "1080px",
	},

	// layout spacings

	spacing: {
		cart_padding: "32px",
	},
}

// *** Spacing and sizing guide
// 4px		0.25rem
// 8px		0.5rem
// 12px		0.75rem
// 16px		1rem
// 24px		1.5rem
// 32px		2rem
// 48px		3rem
// 64px		4rem
// 96px		6rem
// 128px		8rem
// 160px		10rem
// 192px		12rem
// 256px		16rem
// 384px		24rem
// 512px		32rem
// 640px		40rem
// 768px		48rem

// *** Font sizing scale
// 12px		0.75rem
// 14px
// 16px		1rem
// 18px
// 20px		1.25rem
// 24px		1.5rem
// 30px
// 36px		2.25rem
// 48px		3rem
// 64px		4rem
// 96px		6rem

// *** Font spacing scale
// 1em

// *** Paragraph widths
// 20 - 35em

// *** Depth Guides
// Raised effect
// inset 0 1px 0 hsl( choose color by hand ),
// 0 1px 3px hsl(0, 0%, 0%, 0.2);

// Inset effect
// inset 0 1px 3px hsl(0, 0%, 0%, 0.2),
// 0 -1px 0 hsl( choose color by hand );

// *** Shadows
// 0 1px 2px hsla(0, 0%, 0%, .24),
// 0 1px 3px hsla(0, 0%, 0%, .12);

// 0 1px 2px hsla(0, 0%, 0%, .24),
// 0 1px 3px hsla(0, 0%, 0%, .12);

// 0 2px 4px hsla(0, 0%, 0%, .12),
// 0 3px 6px hsla(0, 0%, 0%, .15);

// 0 5px 10px hsla(0, 0%, 0%, .5),
// 0 15px 25px hsla(0, 0%, 0%, .15);

// 0 20px 40px hsla(0, 0%, 0%, .2);
