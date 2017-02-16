const ModelBlueprint = require('../model');
const testInfo = require('ember-cli-test-info');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates a model unit test.',

	locals(options) {
		const result = ModelBlueprint.locals.apply(this, arguments);

		result.friendlyDescription = testInfo.description(options.entity.name, 'Unit', 'Model');

		return result;
	},
});
