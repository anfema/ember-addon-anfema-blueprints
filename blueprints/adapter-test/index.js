const testInfo = require('ember-cli-test-info');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates an ember-data adapter unit test',

	locals(options) {
		return {
			friendlyTestDescription: testInfo.description(options.entity.name, 'Unit', 'Adapter'),
		};
	},
});
