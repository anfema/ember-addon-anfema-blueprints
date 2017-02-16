import { moduleForModel, test } from 'ember-qunit';

moduleForModel('<%= dasherizedModuleName %>', '<%= friendlyDescription %>', {
	<%= typeof needs !== 'undefined' ? needs : '' %>
});

test('it exists', function (assert) {
	const model = this.subject();
	// const store = this.store();

	assert.ok(!!model);
});
