import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('<%= friendlyTestDescription %>', function () {
	setupTest('route:<%= dasherizedModuleName %>', {
		// needs: [
		// 	'controller:foo',
		// ],
	});

	it('exists', function () {
		const route = this.subject();

		expect(route).to.be.ok;
	});
});
