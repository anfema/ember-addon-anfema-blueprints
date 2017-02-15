const stringUtil = require('ember-cli-string-utils');
const pathUtil = require('ember-cli-path-utils');
const validComponentName = require('ember-cli-valid-component-name');
const getPathOption = require('ember-cli-get-component-path-option');
const path = require('path');
const normalizeEntityName = require('ember-cli-normalize-entity-name');

module.exports = {
	description: 'Generates a component. Name must contain a hyphen.',

	availableOptions: [
		{
			name: 'path',
			type: String,
			default: 'components',
			aliases: [
				{
					'no-path': '',
				},
			],
		},
	],

	fileMapTokens() {
		return {
			__path__(options) {
				if (options.pod) {
					return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
				}

				return 'components';
			},
			__templatepath__(options) {
				if (options.pod) {
					return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
				}

				return 'templates/components';
			},
			__templatename__(options) {
				if (options.pod) {
					return 'template';
				}

				return options.dasherizedModuleName;
			},
		};
	},

	normalizeEntityName(entityName) {
		entityName = normalizeEntityName(entityName);

		return validComponentName(entityName);
	},

	locals(options) {
		let templatePath = '';
		let importTemplate = '';
		let contents = '';

		// if we're in an addon, build import statement
		if (options.project.isEmberCLIAddon() || options.inRepoAddon && !options.inDummy) {
			if (options.pod) {
				templatePath = './template';
			} else {
				templatePath = `${pathUtil.getRelativeParentPath(options.entity.name)
				}templates/components/${stringUtil.dasherize(options.entity.name)}`;
			}
			importTemplate = `import layout from '${templatePath}';\n`;
			contents = '\n  layout';
		}

		return {
			importTemplate,
			contents,
			path: getPathOption(options),
		};
	},
};
