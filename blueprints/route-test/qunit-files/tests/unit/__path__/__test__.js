import { moduleFor, test } from 'ember-qunit';

moduleFor('route:<%= dasherizedModuleName %>', '<%= friendlyTestDescription %>', {
	// needs: ['controller:foo'],
});

test('it exists', function (assert) {
	const route = this.subject();

	assert.ok(route);
});
