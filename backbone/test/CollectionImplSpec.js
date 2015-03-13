
var impl = {
  Collection: require('../CollectionImpl'),
  filters: require('../FiltersBackbone')
};

describe("collection-subset Backbone impl", function() {

  require('../../test/CollectionSpec')(impl);

  require('../../test/CollectionOrderSpec')(impl);

  require('../../test/CollectionSortSpec')(impl);

  require('../../test/BackboneCompatibilitySpec')(impl);

  require('../../test/filters/MinimumSpec')(impl);

});
