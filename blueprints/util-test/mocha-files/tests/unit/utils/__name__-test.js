import { expect } from 'chai';
import { describe, it } from 'mocha';
import <%= camelizedModuleName %> from '<%= dasherizedPackageName %>/utils/<%= dasherizedModuleName %>';

describe('<%= friendlyTestName %>', function () {
	// Replace this with your real tests.
	it('works', function () {
		const result = <%= camelizedModuleName %>();

		expect(result).to.be.ok;
	});
});
