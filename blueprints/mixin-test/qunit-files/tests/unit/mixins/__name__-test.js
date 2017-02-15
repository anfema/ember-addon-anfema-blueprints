import Ember from 'ember';
import <%= classifiedModuleName %>Mixin from '<%= projectName %>/mixins/<%= dasherizedModuleName %>';
import { module, test } from 'qunit';

module('<%= friendlyTestName %>');

// Replace this with your real tests.
test('it works', function (assert) {
	const <%= classifiedModuleName %>Object = Ember.Object.extend(<%= classifiedModuleName %>Mixin);
	const subject = <%= classifiedModuleName %>Object.create();

	assert.ok(subject);
});
