/* eslint-env node */

const testInfo = require('ember-cli-test-info');
const stringUtils = require('ember-cli-string-utils');
const isPackageMissing = require('ember-cli-is-package-missing');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates a helper integration test or a unit test.',

	availableOptions: [{
		name: 'test-type',
		type: ['integration', 'unit'],
		default: 'unit',
		aliases: [
			{ i: 'integration' },
			{ u: 'unit' },
			{ integration: 'integration' },
			{ unit: 'unit' },
		],
	}],

	fileMapTokens() {
		return {
			__testType__(options) {
				return options.locals.testType || 'unit';
			},
		};
	},

	locals(options) {
		const testType = options.testType || 'unit';
		const testName = testType === 'integration' ? 'Integration' : 'Unit';
		const friendlyTestName = testInfo.name(options.entity.name, testName, 'Helper');

		return {
			friendlyTestName,
			dasherizedModulePrefix: stringUtils.dasherize(options.project.config().modulePrefix),
			testType,
		};
	},

	afterInstall(options) {
		const packageMissing = isPackageMissing(this, 'ember-cli-htmlbars-inline-precompile');

		if (!options.dryRun && options.testType === 'integration' && packageMissing) {
			return this.addPackagesToProject([
				{ name: 'ember-cli-htmlbars-inline-precompile', target: '^0.3.1' },
			]);
		}

		return null;
	},
});
