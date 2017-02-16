import { expect } from 'chai';
import { describeModel, it } from 'ember-mocha';

describeModel('<%= dasherizedModuleName %>', '<%= friendlyDescription %>', {
	<%= typeof needs !== 'undefined' ? needs : '' %>
}, function () {
	// Replace this with your real tests.
	it('exists', function () {
		const model = this.subject();
		// const store = this.store();

		expect(model).to.be.ok;
	});
});
