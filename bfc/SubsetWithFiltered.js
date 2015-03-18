
var FilteredCollection = require('backbone-filtered-collection');

module.exports = {
  subset: function(options) {
    if (!options.filter.where) {
      throw new Error('Only "where" filter is supported');
    }
    var superset = this;
    var subset = new FilteredCollection(superset);
    subset.filterBy('where', options.filter.where);
    subset.add = function(model, addopt) {
      options.immerse && options.immerse(model);
      superset.add(model, addopt);
    };
    subset.remove = function(model, removeopt) {
      superset.remove(model, removeopt);
    };
    return subset;
  },
  // We get the modified prototype from the backbone impl
  subsetCollect: undefined
};
