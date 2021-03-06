module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
	parserOptions: {
		parser: "babel-eslint",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"linebreak-style": "off",
		"implicit-arrow-linebreak": "off",
		"indent": "off",
		"no-tabs": "off",
		"eol-last": "off",
		"prefer-template": "off",
		"comma-dangle": ["error", "never"],
		"no-underscore-dangle": "off",
		"no-param-reassign": "off",
		"space-before-function-paren": "off",
		"operator-linebreak": "off",
		"max-len": "off",
		"no-plusplus": "off",
		"curly": "off",
		"nonblock-statement-body-position": "off",
		"quotes": "off",
		"function-paren-newline": "off",
		"no-console": "off",
	},
};
