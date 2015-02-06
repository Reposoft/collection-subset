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
    Backbone.Collection.prototype.set.apply(this, arguments);
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
