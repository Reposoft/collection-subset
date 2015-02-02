
function interfaceSpec(implRequireString) {

  var impl = require(implRequireString);

  describe("Collection", function() {

    describe("#subset(options)", function() {

      it("Requires options.filter", function() {

      });

      it("Supports options.insert, a function", function() {

      });

      it("Returns a Collection", function() {

      });

    });

    describe("Subset Collection reading", function() {

      it("Exposes only the elements that match the subset filter argument", function() {

      });

      it("Emits Backbone style change events", function() {

      });

      it("Emits these events only for items matching the filter", function() {

      });

    });

    describe("Subset's #add", function() {

      it("Invokes the options.insert function", function() {

      });

      it("Does so for #add even if the object is already in the backing collection", function() {

      });

      it("Adds below the last item of the subset, because it feels natural", function() {

      });

    });

    describe("Subset's #subset", function() {

      it("Aggregates the filters", function() {

      });

      it("Applies all options.insert functions at add", function() {

      });

      it("Applies the outermost collection's insert first", function() {

      });

    });

    describe("#get()", function() {

      it("Returns a Backbone style object, with data in .attributes", function() {

      });

      it("Returns objects that emit Backbone style events", function() {

      });

      it("Is API compatible with Backbone.Model, but maybe a more generic instance", function() {

      });

      it("Isn't necessarily instanceof Backbone.Model", function() {

      });

      it("Might need a customizable way to convert from data object to model object, at least on the backing collection", function() {

      });

    });

    describe("Sorting", function() {

      it("Preserves sort order from outer collection in inner", function() {

      });

      it("Can't be expected to allow custom sort (Backbone style) functions on subsets", function() {

      });

      it("Should however preserve an explicit insertion order, and the order from backend", function() {

      });

      it("Therefore doesn't fancy Backbone style #sort, but if supported it is a transient state", function() {

      });

      it("On second thought could therefore have independent sort per subset", function() {

      });

      it("Ideally supports move operations within the collection, and emits events for those", function() {

      });

    });

  });

  describe("Filter", function() {

    it("Is something like what PourOver.make*Filter returns", function() {

    });

  });

}

// impl ideas

interfaceSpec('../backbone/CollectionImpl');

//interfaceSpec('../pourover/CollectionImpl');

//interfaceSpec('https://github.com/anthonyshort/backbone.collectionsubset or forks')
