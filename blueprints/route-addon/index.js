const stringUtil = require('ember-cli-string-utils');
const path = require('path');
const inflector = require('inflection');

module.exports = {
	description: 'Generates import wrappers for a route and its template.',

	fileMapTokens() {
		return {
			__templatepath__(options) {
				if (options.pod) {
					return path.join(options.podPath, options.dasherizedModuleName);
				}

				return 'templates';
			},
			__templatename__(options) {
				if (options.pod) {
					return 'template';
				}

				return options.dasherizedModuleName;
			},
			__name__(options) {
				if (options.pod) {
					return 'route';
				}

				return options.dasherizedModuleName;
			},
			__path__(options) {
				if (options.pod && options.hasPathToken) {
					return path.join(options.podPath, options.dasherizedModuleName);
				}

				return 'routes';
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
		const locals = {};
		const addonRawName = options.inRepoAddon ? options.inRepoAddon : options.project.name();
		const addonName = stringUtil.dasherize(addonRawName);
		const fileName = stringUtil.dasherize(options.entity.name);

		['route', 'template'].forEach(function (blueprint) {
			let pathName = [addonName, inflector.pluralize(blueprint), fileName].join('/');

			if (options.pod) {
				pathName = [addonName, fileName, blueprint].join('/');
			}

			locals[`${blueprint}ModulePath`] = pathName;
		});

		return locals;
	},
};
