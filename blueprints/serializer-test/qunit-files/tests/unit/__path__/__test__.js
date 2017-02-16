import { moduleForModel, test } from 'ember-qunit';

moduleForModel('<%= dasherizedModuleName %>', '<%= friendlyTestDescription %>', {
	needs: ['serializer:<%= dasherizedModuleName %>'],
});

// Replace this with your real tests.
test('it serializes records', function (assert) {
	const record = this.subject();
	const serializedRecord = record.serialize();

	assert.ok(serializedRecord);
});
