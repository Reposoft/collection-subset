
var impl = {
  Collection: require('../CollectionImpl'),
  CollectionB: require('../CollectionBImpl'),
  filters: require('../FiltersBackbone')
};

describe("collection-subset Backbone impl", function() {

  require('./UnitTests')(impl);

  require('../../test/CollectionSubsetSpec')(impl);

  require('../../test/CollectionOrderSpec')(impl);

  require('../../test/CollectionSortSpec')(impl);

  require('../../test/CollectionGroupSpec')(impl);

  require('../../test/CollectionObservableSpec')(impl);

  require('../../test/BackboneCompatibilitySpec')(impl);

  require('../../test/filters/MinimumSpec')(impl);

});
