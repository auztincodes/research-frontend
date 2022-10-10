const config = {
	preset: '@vue/cli-plugin-unit-jest',
	transformIgnorePatterns: ['node_modules/(?!vee-validate|vue-radial-progress)'],
	moduleFileExtensions: ['js', 'vue', 'json'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'.*\\.(vue)$': 'vue-jest'
	},
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/*.vue']
	// collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**', '!**/coverage/**'],
};

module.exports = config;
