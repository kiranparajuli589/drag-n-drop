/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
	root: true,
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting"
	],
	parserOptions: {
		ecmaVersion: "latest"
	},
	rules: {
		semi: ["error", "never"],
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"vue/html-indent": ["error", "tab", {
			"attribute": 1,
			"baseIndent": 1,
			"closeBracket": 0,
			"alignAttributesVertically": true,
			"ignores": []
		}],
		"vue/script-indent": ["error", "tab", {
			"baseIndent": 0,
		}],
		"vue/max-attributes-per-line": ["error", {
			"singleline": {
				"max": 2
			},
			"multiline": {
				"max": 2
			}
		}],
		"vue/html-closing-bracket-newline": ["error", {
			"singleline": "never",
			"multiline": "always"
		}],
		"vue/valid-v-slot": ["error", {
			allowModifiers: true,
		}],
	}
}
