const testInfo = require('ember-cli-test-info');
const pathUtil = require('ember-cli-path-utils');
const stringUtils = require('ember-cli-string-utils');
const existsSync = require('exists-sync');
const path = require('path');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates an acceptance test for a feature.',

	locals(options) {
		let testFolderRoot = stringUtils.dasherize(options.project.name());

		if (options.project.isEmberCLIAddon()) {
			testFolderRoot = pathUtil.getRelativeParentPath(options.entity.name, -1, false);
		}

		const destroyAppExists = existsSync(path.join(this.project.root, '/tests/helpers/destroy-app.js'));

		return {
			testFolderRoot,
			friendlyTestName: testInfo.name(options.entity.name, 'Acceptance', null),
			destroyAppExists,
		};
	},
});
