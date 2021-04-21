// constants
export const app_green_hsl = "86, 48%, 48%"
export const app_green_hex = "#82B540"
export const app_logo_hsl = "77, 60%, 52%"
export const app_logo_hex = "#A5CE39"
export const app_gold_hsl = "43, 47%, 35%"
export const app_gold_hex = "#836B2F"
export const disabled_hsl = "150, 1%, 57%"

// declare theme
export const theme = {
	color: {
		app_green: `hsla(${app_green_hsl}, 1.0)`,
		app_green_hsl: app_green_hsl,
		app_green_hex: app_green_hex,
		app_logo: `hsla(${app_logo_hsl}, 1.0)`,
		app_logo_hsl: app_logo_hsl,
		app_logo_hex: app_logo_hex,
		app_gold: `hsla(${app_gold_hsl}, 1.0)`,
		app_gold_hsl: app_gold_hsl,
		app_gold_hex: app_gold_hex,

		background: "hsla(0, 0%, 0%, 0.85)",
		accent_light: "#F3F5F5",
		disabled: `hsla(${disabled_hsl}, 1.0)`,
		hover_bg: `hsla(${app_logo_hsl}, 0.5)`,
		hover_disabled: `hsla(${disabled_hsl}, 0.3)`,

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
