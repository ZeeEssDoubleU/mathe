import { DefaultTheme } from "styled-components"

// merge theme (below) to DefaultTheme
declare module "styled-components" {
	export interface DefaultTheme {
		appGreen: string
		appGreenPartial: string
		appGold: string
		shadow: string
		background: string

		// font families
		fontMain: string
		fontMainWeight: number
		fontMainWeight_Bold: number
		fontMainWeight_Heavy: number
		fontMainWeight_Header: number
		fontMainWeight_SubHeader: number
		fontMainWeight_SectionHeader: number
		fontMainWeight_Nav: number
		fontMainWeight_Link: number
		fontMainWeight_Cart: number

		fontAccent: string
		fontAccentWeight: number

		// media queries (px) - width
		mobile: number
		tablet: number
		desktop: number
		wide: number
		fullhd: number

		// media queries (px) - height
		short: number
		med: number
		tall: number
		giant: number
	}
}

// declare theme
export const theme: DefaultTheme = {
	// general
	appGreen: "hsla(86, 48%, 48%, 1.0)",
	appGreenPartial: "86, 48%, 48%",
	appGold: "hsla(43, 47%, 35%, 1.0)",
	shadow: "black 0 2px",
	background: "hsla(0, 0%, 0%, 0.85)",

	// font families
	fontMain: "Montserrat, Avenir, Arial, sans-serif",
	fontMainWeight: 200,
	fontMainWeight_Bold: 300,
	fontMainWeight_Heavy: 500,
	fontMainWeight_Header: 400,
	fontMainWeight_SubHeader: 300,
	fontMainWeight_SectionHeader: 300,
	fontMainWeight_Nav: 400,
	fontMainWeight_Link: 400,
	fontMainWeight_Cart: 300,

	fontAccent: "Merriweather, Garamond, serif",
	fontAccentWeight: 300,

	// media queries (px) - width
	mobile: 320,
	tablet: 768,
	desktop: 1024,
	wide: 1216,
	fullhd: 1408,

	// media queries (px) - height
	short: 480,
	med: 720,
	tall: 960,
	giant: 1080,
}

// // Spacing and sizing guide
// 4px
// 8px
// 12px
// 16px
// 24px
// 32px
// 48px
// 64px
// 96px
// 128px
// 192px
// 256px
// 384px
// 512px
// 640px
// 768px

// Font sizing scale
// 12px
// 14px
// 16px
// 18px
// 20px
// 24px
// 30px
// 36px
// 48px
// 64px
// 96px

// Paragraph widths
// 20 - 35ems

// Depth Guides
// Raised effect
// inset 0 1px 0 hsl( choose color by hand ),
// 0 1px 3px hsl(0, 0%, 0%, 0.2);

// Inset effect
// inset 0 1px 3px hsl(0, 0%, 0%, 0.2),
// 0 -1px 0 hsl( choose color by hand );

// Shadows
// 0 1px 2px hsla(0, 0%, 0%, .24),
// 0 1px 3px hsla(0, 0%, 0%, .12);

// 0 1px 2px hsla(0, 0%, 0%, .24),
// 0 1px 3px hsla(0, 0%, 0%, .12);

// 0 2px 4px hsla(0, 0%, 0%, .12),
// 0 3px 6px hsla(0, 0%, 0%, .15);

// 0 5px 10px hsla(0, 0%, 0%, .5),
// 0 15px 25px hsla(0, 0%, 0%, .15);

// 0 20px 40px hsla(0, 0%, 0%, .2);
