import DS from 'ember-data';

const { Model/* , attr, belongsTo, hasMany */ } = DS;

export default Model.extend({
<%= attrs.length ? '\t' + attrs : '' %>
});
