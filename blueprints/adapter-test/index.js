var testInfo = require('ember-cli-test-info');
var useTestFrameworkDetector = require('ember-cli-legacy-blueprints/blueprints/test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates an ember-data adapter unit test',

	locals: function(options) {
		return {
			friendlyTestDescription: testInfo.description(options.entity.name, 'Unit', 'Adapter')
		};
	}
});
