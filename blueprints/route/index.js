const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const EmberRouterGenerator = require('ember-router-generator');

function findRouter(options) {
	let routerPathParts = [options.project.root];

	if (options.dummy && options.project.isEmberCLIAddon()) {
		routerPathParts = routerPathParts.concat(['tests', 'dummy', 'app', 'router.js']);
	} else {
		routerPathParts = routerPathParts.concat(['app', 'router.js']);
	}

	return routerPathParts;
}

function writeRoute(action, name, options) {
	const routerPath = path.join.apply(null, findRouter(options));
	const source = fs.readFileSync(routerPath, 'utf-8');

	const routes = new EmberRouterGenerator(source);
	const newRoutes = routes[action](name, options);

	fs.writeFileSync(routerPath, newRoutes.code());
}

function updateRouter(action, options) {
	const entity = options.entity;
	const actionColorMap = {
		add: 'green',
		remove: 'red',
	};
	const color = actionColorMap[action] || 'gray';

	if (this.shouldTouchRouter(entity.name, options)) {
		writeRoute(action, entity.name, options);

		this.ui.writeLine('updating router');
		this._writeStatusToUI(chalk[color], `${action} route`, entity.name);
	}
}

module.exports = {
	description: 'Generates a route and a template, and registers the route with the router.',

	availableOptions: [
		{
			name: 'path',
			type: String,
			default: '',
		},
		{
			name: 'skip-router',
			type: Boolean,
			default: false,
		},
		{
			name: 'reset-namespace',
			type: Boolean,
		},
	],

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
			__root__(options) {
				if (options.inRepoAddon) {
					return path.join('lib', options.inRepoAddon, 'addon');
				}

				if (options.inDummy) {
					return path.join('tests', 'dummy', 'app');
				}

				if (options.inAddon) {
					return 'addon';
				}

				return 'app';
			},
		};
	},

	shouldEntityTouchRouter(name) {
		const isIndex = name === 'index';
		const isBasic = name === 'basic';
		const isApplication = name === 'application';

		return !isBasic && !isIndex && !isApplication;
	},

	shouldTouchRouter(name, options) {
		const entityTouchesRouter = this.shouldEntityTouchRouter(name);
		const isDummy = !!options.dummy;
		const isAddon = !!options.project.isEmberCLIAddon();
		const isAddonDummyOrApp = (isDummy === isAddon);

		return (entityTouchesRouter && isAddonDummyOrApp && !options.dryRun
			&& !options.inRepoAddon && !options.skipRouter);
	},

	afterInstall(options) {
		updateRouter.call(this, 'add', options);
	},

	afterUninstall(options) {
		updateRouter.call(this, 'remove', options);
	},
};
