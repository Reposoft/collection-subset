'use strict';

var _ = require('underscore');
var CollectionB = require('./CollectionBImpl');

var Collection = module.exports = CollectionB.extend({

  set: function set(models) {
    var singular = !_.isArray(models);
    models = singular ? (models ? [models] : []) : models.slice();
    for (var i = 0, length = models.length; i < length; i++) {
      if (!models[i].hasOwnProperty('attributes')) {
        throw new Error('Attributes property required, transfers state');
      }
    }
    return CollectionB.prototype.set.apply(this, arguments);
  }

});
