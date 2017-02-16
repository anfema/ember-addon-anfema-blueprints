/* eslint-env node */

const stringUtil = require('ember-cli-string-utils');
const path = require('path');
const inflector = require('inflection');

module.exports = {
	description: 'Generates an import wrapper.',

	fileMapTokens() {
		return {
			__name__(options) {
				if (options.pod && options.hasPathToken) {
					return options.locals.blueprintName;
				}

				return options.dasherizedModuleName;
			},
			__path__(options) {
				if (options.pod && options.hasPathToken) {
					return path.join(options.podPath, options.dasherizedModuleName);
				}

				return inflector.pluralize(options.locals.blueprintName);
			},
			__root__(options) {
				if (options.inRepoAddon) {
					return path.join('lib', options.inRepoAddon, 'app');
				}

				return 'app';
			},
		};
	},

	locals(options) {
		const addonRawName = options.inRepoAddon ? options.inRepoAddon : options.project.name();
		const addonName = stringUtil.dasherize(addonRawName);
		const fileName = stringUtil.dasherize(options.entity.name);

		let blueprintName = options.originBlueprintName;
		let modulePathSegments = [addonName, inflector.pluralize(options.originBlueprintName), fileName];

		if (blueprintName.match(/-addon/)) {
			blueprintName = blueprintName.substr(0, blueprintName.indexOf('-addon'));
			modulePathSegments = [addonName, inflector.pluralize(blueprintName), fileName];
		}

		if (options.pod) {
			modulePathSegments = [addonName, fileName, blueprintName];
		}

		return {
			modulePath: modulePathSegments.join('/'),
			blueprintName,
		};
	},
};
