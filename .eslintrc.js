module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"eslint-config-prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"react/prop-types": "off", // typescript will take care of type-checking
		"react/display-name": "off", // to allow anonymous functions
	},
	overrides: [
		{
			files: ["*.js"],
			rules: {
				"@typescript-eslint/no-var-requires": "off",
			},
		},
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/ban-ts-comment": "off",
			},
		},
	],
}
