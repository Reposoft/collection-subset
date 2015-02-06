
var _ = require('underscore');

global._ = _;
var PourOver = require('./vendor/pourover');

var Collection = module.exports = PourOver.Collection;

Collection.prototype.add = function add(models) {
  var singular = !_.isArray(models);
  models = singular ? [models] : _.clone(models);
  var objects = _.pluck(models, 'attributes');
  if (objects.indexOf(undefined) !== -1) {
    throw 'Attributes property required, transfers state';
  }
  this.addItems(objects);
  return singular ? models[0] : models;
};

Collection.prototype.size = function size() {
  return this.items.length;
};
