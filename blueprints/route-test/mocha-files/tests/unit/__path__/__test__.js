import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

describeModule('route:<%= dasherizedModuleName %>', '<%= friendlyTestDescription %>', {
	// needs: ['controller:foo'],
}, function () {
	it('exists', function () {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
