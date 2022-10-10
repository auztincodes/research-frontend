module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'generator-star-spacing': 'off',
		// don't require .vue extension when importing
		'import/extensions': [
			'off',
			'always',
			{
				js: 'never',
				vue: 'never'
			}
		],
		// disallow reassignment of function parameters
		// disallow parameter object manipulation except for specific exclusions
		'no-param-reassign': [2, { props: false }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'comma-dangle': ['error', 'never'],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'max-len': [
			2,
			250,
			4,
			{
				ignoreComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignorePattern: '(d=)([^>]*)'
			}
		],
		'no-trailing-spaces': 0,
		'arrow-body-style': 0,
		'no-undef': 0,
		'class-methods-use-this': 0,
		'no-useless-escape': 0,
		'no-tabs': 0,
		'eol-last': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true
			}
		}
	]
};
