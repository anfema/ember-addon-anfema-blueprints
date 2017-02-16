import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel('<%= dasherizedModuleName %>', '<%= friendlyTestDescription %>', {
	needs: ['serializer:<%= dasherizedModuleName %>'],
}, function () {
	// Replace this with your real tests.
	it('serializes records', function () {
		const record = this.subject();
		const serializedRecord = record.serialize();

		expect(serializedRecord).to.be.ok;
	});
});
