
// Mixin subset capabilities to instance or prototype
module.exports = function() {

  var collection = this;

  var BC = {};
  for (var p in collection) {
    BC[p] = collection[p];
  }

  collection.initialize = function(models, options) {
    //console.assert(options.comparator && options.comparator === false); // not strictly necessary but strongly recommended for the scope of this module
    BC.initialize.apply(arguments);
    this.superset = options.superset;
    this.supersetMatcher = options.supersetMatcher;
    this.supersetImmerse = options.supersetImmerse;
  };

  return collection;

};
