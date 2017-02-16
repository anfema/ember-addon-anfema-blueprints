module.exports = {
	extends: '../.eslintrc.js',

	env: {
		mocha: true,
		embertest: true,
		qunit: true,
		node: true,
	},

	rules: {
		'no-unused-expressions': 'off',
	}
};
