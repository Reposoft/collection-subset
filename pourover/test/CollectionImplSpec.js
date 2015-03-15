
var impl = {
  Collection: require('../CollectionImpl'),
  filters: require('../FiltersPourOver')
};

describe("collection-subset PourOver impl", function() {

  // Note: This impl is not prioritized while creating the basic API of this module, so comment out below as specs expand

  //require('../../test/CollectionSubsetSpec')(impl);

  //require('../../test/CollectionOrderSpec')(impl);

  require('../../test/CollectionSortSpec')(impl);

  require('../../test/CollectionGroupSpec')(impl);

  require('../../test/CollectionObservedSpec')(impl);

  // TODO PourOver doesn't emit add events for example
  //require('../../test/BackboneCompatibilitySpec')(impl);

  //require('../../test/filters/MinimumSpec')(impl);

  require('../../test/filters/ContinuousRangeSpec')(impl);

});
