const stringUtil = require('ember-cli-string-utils');
const SilentError = require('silent-error');
const pathUtil = require('ember-cli-path-utils');
const existsSync = require('exists-sync');
const path = require('path');

module.exports = function (type, baseClass, options) {
	const entityName = options.entity.name;
	const isAddon = options.inRepoAddon || options.project.isEmberCLIAddon();
	let relativePath = pathUtil.getRelativePath(options.entity.name);

	if (options.pod && options.podPath) {
		relativePath = pathUtil.getRelativePath(options.podPath + options.entity.name);
	}

	const entityDirectory = `${type}s`;
	const applicationEntityPath = path.join(options.project.root, 'app', entityDirectory, 'application.js');
	const hasApplicationEntity = existsSync(applicationEntityPath);

	if (!isAddon && !options.baseClass && entityName !== 'application' && hasApplicationEntity) {
		options.baseClass = 'application';
	}

	if (options.baseClass === entityName) {
		throw new SilentError(`${stringUtil.classify(type)}s cannot extend from themself. To resolve this, remove the \`--base-class\` option or change to a different base-class.`);
	}

	let importStatement = 'import DS from \'ember-data\';';

	if (options.baseClass) {
		// eslint-disable-next-line no-useless-escape
		baseClass = stringUtil.classify(options.baseClass.replace('\/', '-'));
		baseClass += stringUtil.classify(type);
		importStatement = `import ${baseClass} from '${relativePath}${options.baseClass}';`;
	}

	// @TODO Extend this to support importing of local modules

	return {
		importStatement,
		baseClass,
	};
};
