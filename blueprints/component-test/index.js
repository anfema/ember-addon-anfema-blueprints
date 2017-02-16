const path = require('path');
const testInfo = require('ember-cli-test-info');
const stringUtil = require('ember-cli-string-utils');
const isPackageMissing = require('ember-cli-is-package-missing');
const getPathOption = require('ember-cli-get-component-path-option');
const useTestFrameworkDetector = require('../test-framework-detector');

module.exports = useTestFrameworkDetector({
	description: 'Generates a component integration or unit test.',

	availableOptions: [{
		name: 'test-type',
		type: ['integration', 'unit'],
		default: 'integration',
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
				return options.locals.testType || 'integration';
			},
			__path__(options) {
				if (options.pod) {
					return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
				}

				return 'components';
			},
		};
	},

	locals(options) {
		const dasherizedModuleName = stringUtil.dasherize(options.entity.name);
		let componentPathName = dasherizedModuleName;
		const testType = options.testType || 'integration';
		let friendlyTestDescription = testInfo.description(options.entity.name, 'Integration', 'Component');

		if (options.pod && options.path !== 'components' && options.path !== '') {
			componentPathName = [options.path, dasherizedModuleName].join('/');
		}

		if (options.testType === 'unit') {
			friendlyTestDescription = testInfo.description(options.entity.name, 'Unit', 'Component');
		}

		return {
			path: getPathOption(options),
			testType,
			componentPathName,
			friendlyTestDescription,
		};
	},

	afterInstall(options) {
		const missingPackage = isPackageMissing(this, 'ember-cli-htmlbars-inline-precompile');

		if (!options.dryRun && options.testType === 'integration' && missingPackage) {
			return this.addPackagesToProject([
				{ name: 'ember-cli-htmlbars-inline-precompile', target: '^0.3.1' },
			]);
		}

		return null;
	},
});
