const inflection = require('inflection');
const stringUtils = require('ember-cli-string-utils');
const EOL = require('os').EOL;

function dsAttr(name, type) {
	// @TODO add used types to destructuring

	switch (type) {
		case 'belongs-to':
			return `belongsTo('${name}')`;
		case 'has-many':
			return `hasMany('${name}')`;
		case '':
			// "If you don't specify the type of the attribute, it will be whatever was provided by the server"
			// http://emberjs.com/guides/models/defining-models/
			return 'attr()';
		default:
			return `attr('${type}')`;
	}
}

module.exports = {
	description: 'Generates an ember-data model.',

	anonymousOptions: [
		'name',
		'attr:type',
	],

	locals(options) {
		let attrs = [];
		let needs = [];
		const entityOptions = options.entity.options;

		for (const name in entityOptions) {
			let type = entityOptions[name] || '';
			let foreignModel = name;

			if (type.indexOf(':') > -1) {
				foreignModel = type.split(':')[1];
				type = type.split(':')[0];
			}
			const dasherizedName = stringUtils.dasherize(name);
			const camelizedName = stringUtils.camelize(name);
			const dasherizedType = stringUtils.dasherize(type);
			const dasherizedForeignModel = stringUtils.dasherize(foreignModel);
			const dasherizedForeignModelSingular = inflection.singularize(dasherizedForeignModel);

			let attr;

			if (/has-many/.test(dasherizedType)) {
				const camelizedNamePlural = inflection.pluralize(camelizedName);

				attr = dsAttr(dasherizedForeignModelSingular, dasherizedType);
				attrs.push(`${camelizedNamePlural}: ${attr}`);
			} else if (/belongs-to/.test(dasherizedType)) {
				attr = dsAttr(dasherizedForeignModel, dasherizedType);
				attrs.push(`${camelizedName}: ${attr}`);
			} else {
				attr = dsAttr(dasherizedName, dasherizedType);
				attrs.push(`${camelizedName}: ${attr}`);
			}

			if (/has-many|belongs-to/.test(dasherizedType)) {
				needs.push(`'model:${dasherizedForeignModelSingular}'`);
			}
		}

		const needsDeduplicated = needs.filter((need, i) => needs.indexOf(need) === i);

		attrs = `${attrs.join(`,${EOL}\t`)},`;
		needs = `\tneeds: [${needsDeduplicated.join(', ')}],`;

		return {
			attrs,
			needs,
		};
	},
};
