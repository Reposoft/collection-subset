'use strict';

// The "Turn bare objects into model references" part for Backbone's annotated source is interesting
// http://backbonejs.org/docs/backbone.html#section-90

var Backbone = require('./BackboneExport');
var _ = Backbone._;

var Collection = module.exports = Backbone.Collection;

Collection.prototype.subset = function(options) {
  if (!options.filter) {
    throw 'Subset options must have a filter property';
  }
  var matcher;
  if (options.filter.where) {
    matcher = function(model) {
      return _.isMatch(model.attributes, options.filter.where);
    }
  }
  if (typeof matcher == 'undefined') {
    console.log('Unrecognized filter', options);
    throw Error('Unrecognized filter');
  }
  // this.filter(matcher);
  return new Collection([], {
    superset: this,
    supersetMatcher: matcher,
    supersetImmerse: options.immerse
  });
};

// The methods below are part of the stricter order scope, and might be extracted to upstream "bmc" module
// TODO extract to mixin

Collection.prototype.addAfter = function addAfter(newModel, referenceModel) {
  var ix = this.indexOf(referenceModel);
  if (referenceModel < 0) {
    throw 'Reference model not found in collection';
  }
  if (this.contains(newModel)) {
    throw 'Already a collection member';
  }
  this.add(newModel, {at:ix});
};

Collection.prototype.addFirst = function addFirst(newModel) {
  if (this.contains(newModel)) {
    throw 'Already a collection member';
  }
  this.add(newModel, {at:0});
};
