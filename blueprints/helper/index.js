const normalizeEntityName = require('ember-cli-normalize-entity-name');

module.exports = {
	description: 'Generates a helper function.',

	normalizeEntityName(entityName) {
		return normalizeEntityName(entityName);
	},
};
