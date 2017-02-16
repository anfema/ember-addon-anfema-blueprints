import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('service:<%= dasherizedModuleName %>', '<%= friendlyTestDescription %>', {
	// needs: ['service:foo'],
}, function () {
	// Replace this with your real tests.
	it('exists', function () {
		const service = this.subject();

		expect(service).to.be.ok;
	});
});
