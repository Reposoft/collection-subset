
var _ = require('./BackboneExport')._;

// Must be kept private here so that no one modifies the references that these keys have
// and values should be kept immutable, stateless
var subset = {

  immerse: function immerseNop() {},

  pull: function subsetDefaultPull() {
    console.assert(this.subset, 'Context must have the subset mixin');
    console.assert(this.subset.from, 'Context must have subest activated');
    console.assert(this.subset.from.filter, 'Superset must have a filter method', JSON.stringify(this.subset.from));
    var filtered = this.subset.from.filter(this.subset.matcher);
    if (filtered && filtered.length > 0) {
      this.add(filtered);
    }
  }

};

module.exports = function() {
  console.assert(arguments.length === 0, 'Mixin runs on context, not argument')

  // Record all existing methods on instance/prototype in case we need them when overriding
  // this is lazy and should probably be reduced to an enum
  var BackboneCollection = {};
  for (var p in this) {
    BackboneCollection[p] = this[p];
  }

  // Mixin
  _.extend(this.subset || (this.subset = {}), subset);

  // Override
  this.initialize = function(models, options) {
    // probably we don't need to depend on backbone's default initialize, so this can be removed if for example it simplifies testing
    console.assert(!!BackboneCollection.initialize, 'Missing super.initialize');

    // not strictly necessary but strongly recommended for the scope of this module
    //console.assert(options.comparator && options.comparator === false);

    BackboneCollection.initialize.apply(arguments);

    if (typeof options !== 'undefined' && options.subset) {
      // intentionally resets the .subset mixin space if already existing
      _.extend(this.subset, options.subset);
      console.assert(!!this.subset.from, 'Subset must have a "from" collection');
      console.assert(!!this.subset.matcher, 'Subset must have a matcher function');
      this.subset.pull.call(this);
    }
  };

  return this;

};
