'use strict';

// The "Turn bare objects into model references" part for Backbone's annotated source is interesting
// http://backbonejs.org/docs/backbone.html#section-90

var Backbone = require('./BackboneExport');
var _ = Backbone._;

var Collection = module.exports = Backbone.Collection;

// Implements subset as a new collection with some event listeners and propagation back
var subsetConnect = function(superset, matcher, immerse) {
  var initialModels = superset.filter(matcher);
  console.log('matched', initialModels.length, 'of', superset.toJSON());
  var subset = new Collection(initialModels);
  // Modifications on sub
  subset.on('add', immerse);
  subset.on('add', superset.add.bind(this));
  subset.on('remove', superset.remove.bind(this));
  // Modifications on super
  subset.listenTo(superset, 'add', function(model) {
    if (matcher(model.attributes)) {
      this.add(model);
    }
  });
  subset.listenTo(superset, 'remove', function(model) {
    if (matcher(model.attributes)) {
      this.remove(model);
    }
  });
  // TODO test coverage?
  //subset.listenTo(superset, 'change', function() {
  //
  //});
  return subset;
};

Collection.prototype.subset = function(options) {
  if (!options.filter) {
    throw 'Subset options must have a filter property';
  }
  var matcher;
  if (options.filter.where) {
    matcher = _.matcher(options.filter.where);
    console.log('matcher', options.filter.where, matcher(options.filter.where));
  }
  if (typeof matcher == 'undefined') {
    console.log('Unrecognized filter', options);
    throw Error('Unrecognized filter');
  }
  return subsetConnect(this, matcher, options.immerse || function() {});
};

// The methods below are part of the stricter order scope, and might be extracted to upstream "bmc" module

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
