'use strict';

var _ = require('underscore');
var CollectionB = require('./CollectionBImpl');
var Backbone = require('./BackboneExport');

// TODO extract to mixin ("strict")

var Collection = module.exports = CollectionB.extend({

  // Model identification using instanceof is embedded in
  // https://github.com/jashkenas/backbone/blob/1.1.2/backbone.js#L686
  // but potentially customizable after
  // https://github.com/jashkenas/backbone/commit/3edb08519ab09d3e8d7f00913261360796a5ef5d + https://github.com/jashkenas/backbone/commit/f45788c13b18cea8c6ba62e95e80e403bfe6728c
  // https://github.com/jashkenas/backbone/commit/4e2d20918f091b2f989a0baf85a12813a414e2f0

  set: function set(models) {
    var singular = !_.isArray(models);
    models = singular ? (models ? [models] : []) : models.slice();
    for (var i = 0, length = models.length; i < length; i++) {
      if (!models[i].hasOwnProperty('attributes')) {
        throw new Error('Attributes property required, transfers state');
      }
      if (!(models[i] instanceof Backbone.Model)) {
        console.log('Warning: backbone will wrap anthing that is not a Model subclass');
      }
    }
    return CollectionB.prototype.set.apply(this, arguments);
  },

  /* Requires Backbone>1.1.2
  _isModel: function (model) {
    return typeof model.attributes !== 'undefined';
  }
  */

});
