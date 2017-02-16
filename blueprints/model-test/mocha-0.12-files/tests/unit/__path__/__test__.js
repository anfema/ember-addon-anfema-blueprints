import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('<%= friendlyDescription %>', function () {
	setupModelTest('<%= dasherizedModuleName %>', {
		<%= typeof needs !== 'undefined' ? needs : '' %>
	});

	// Replace this with your real tests.
	it('exists', function () {
		const model = this.subject();
		// const store = this.store();

		expect(model).to.be.ok;
	});
});
