
var impl = {
  Collection: require('../CollectionImpl'),
  CollectionB: require('../CollectionBImpl'),
  filters: require('../../backbone/FiltersBackbone')
};

describe("backbone-filtered-collection impl", function() {

  require('../../test/CollectionSubsetSpec')(impl);

  require('../../test/CollectionOrderSpec')(impl);

  require('../../test/CollectionSortSpec')(impl);

  require('../../test/CollectionGroupSpec')(impl);

  require('../../test/CollectionObservedSpec')(impl);

  require('../../test/BackboneCompatibilitySpec')(impl);

  require('../../test/filters/MinimumSpec')(impl);

});
