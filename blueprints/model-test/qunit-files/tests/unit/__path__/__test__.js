import { moduleForModel, test } from 'ember-qunit';

moduleForModel('<%= dasherizedModuleName %>', '<%= friendlyDescription %>', {
	// Specify the other units that are required for this test.
	<%= typeof needs !== 'undefined' ? needs : '' %>
});

test('it exists', function (assert) {
	const model = this.subject();

	// const store = this.store();

	assert.ok(!!model);
});
