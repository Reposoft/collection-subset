
var _ = require('underscore');

global._ = _;
var PourOver = require('./vendor/pourover');

var Collection = module.exports = PourOver.Collection;

Collection.prototype.add = function add(models) {
  var singular = !_.isArray(models);
  models = singular ? [models] : _.clone(models);
  var objects = _.pluck(models, 'attributes');
  this.addItems(objects);
};

Collection.prototype.size = function size() {
  return this.items.length;
};
