'use strict';

// The "Turn bare objects into model references" part for Backbone's annotated source is interesting
// http://backbonejs.org/docs/backbone.html#section-90

var _ = require('underscore');
var Backbone = require('backbone');

var Collection = module.exports = Backbone.Collection.extend({

  set: function set(models) {
    var singular = !_.isArray(models);
    models = singular ? (models ? [models] : []) : models.slice();
    for (var i = 0, length = models.length; i < length; i++) {
      if (!models[i].hasOwnProperty('attributes')) {
        throw 'Attributes property required, transfers state';
      }
    }
    return Backbone.Collection.prototype.set.apply(this, arguments);
  }

});

// We actually modify Backbone's prototype with the below, but that's our own Backbone supposedly

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
