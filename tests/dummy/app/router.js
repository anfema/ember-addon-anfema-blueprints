import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
Router.map(function () {
});

export default Router;
