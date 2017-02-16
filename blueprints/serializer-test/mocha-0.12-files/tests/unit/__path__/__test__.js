import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('<%= friendlyTestDescription %>', function () {
	setupModelTest('<%= dasherizedModuleName %>', {
		needs: ['serializer:<%= dasherizedModuleName %>'],
	});

	// Replace this with your real tests.
	it('serializes records', function () {
		const record = this.subject();
		const serializedRecord = record.serialize();

		expect(serializedRecord).to.be.ok;
	});
});
