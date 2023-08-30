module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	parser: '@typescript-eslint/parser',
	plugins: ['react', 'react-refresh', '@typescript-eslint', 'prettier'],
	rules: {
		'max-len': ['error', { code: 80 }],
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
};
