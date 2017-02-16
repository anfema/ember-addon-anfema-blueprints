import <%= camelizedModuleName %> from '<%= dasherizedModulePrefix %>/utils/<%= dasherizedModuleName %>';
import { module, test } from 'qunit';

module('<%= friendlyTestName %>');

// Replace this with your real tests.
test('it works', function (assert) {
	const result = <%= camelizedModuleName %>();

	assert.ok(result);
});
