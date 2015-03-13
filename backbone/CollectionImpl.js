'use strict';

// The "Turn bare objects into model references" part for Backbone's annotated source is interesting
// http://backbonejs.org/docs/backbone.html#section-90

var Backbone = require('backbone');

var Collection = module.exports = Backbone.Collection;

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

Collection.prototype.subset = function(options) {
  if (!options.filter) {
    throw 'Subset options must have a filter property';
  }
  if (options.filter.where) {
    return this.subsetConnect(this.where(options.filter.where));
  }
  console.log('filter', options.filter, 'among', this.pluck('id'));
};

Collection.prototype.subsetConnect = function(models) {
  var subset = new Collection(models);
  return subset;
};
