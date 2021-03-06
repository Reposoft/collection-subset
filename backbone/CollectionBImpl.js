'use strict';

// The "Turn bare objects into model references" part for Backbone's annotated source is interesting
// http://backbonejs.org/docs/backbone.html#section-90

var Backbone = require('./BackboneExport');

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
  var subset;
  if (options.filter.where) {
    subset = this.subsetConnect(this.where(options.filter.where));
  }
  if (typeof subset == 'undefined') {
    console.log('Unrecognized filter', options);
    throw 'Unrecognized filter';
  }
  // TODO maybe this should be reversed, with the subset doing this.on and superset.listenTo?
  if (options.immerse) {
    subset.on('add', options.immerse);
  }
  subset.on('add', this.add.bind(this));
  subset.on('remove', this.remove.bind(this));
  return subset;
};

Collection.prototype.subsetConnect = function(models) {
  var subset = new Collection(models);
  return subset;
};
