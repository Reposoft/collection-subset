
var expect = require('chai').expect;

var Backbone = require('backbone');

function interfaceSpec(impl, required) {

  var Collection = required.Collection;

  describe("Collection, " + impl + " impl", function() {

    describe("Compatibility with Backbone.Collection", function() {
      var b = new Backbone.Collection();
      var c = new Collection();

      var Listener = function(collection) {

        this.id = collection.toString();

        this.log = [];

        var eventHandler = function(event) {
          this.log.push(arguments);
          console.log(this.id, JSON.stringify(event));
        };

        collection.on('add', eventHandler.bind(this));
      };

      var be = new Listener(b);
      var ce = new Listener(c);

      it("Accepts Backbone.Model instances", function() {
        var m1 = new Backbone.Model({'name':'test1', 'date':new Date()});
        b.add(m1);
        c.add(m1);
        expect(be.log).to.have.length(1);
        expect(ce.log).to.have.length(1);
      });

      it("Accepts Backbone.Model subclass instances", function() {

      });

    });

    describe("#subset(options)", function() {

      it("Requires options.filter", function() {

      });

      it("Supports options.immerse, a function", function() {

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

      it("Invokes the options.immerse function", function() {

      });

      it("With the default immerse being a no-op i.e. no attribute changes", function() {

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

  describe("#subsetSupports", function() {

    it("Is a function available on the collection prototype and on instances", function() {

    });

    it("Returns true given a string if the filter name as defined in Filters (below) is supported", function() {

    });

    it("Returns true given a filter instance if the filter is supported", function() {

    });

  });

  describe("Filter", function() {

    it("Is something like what PourOver.make*Filter returns", function() {

    });

    it("Can be a Date range", function() {

    });

    it("Can be a moment.js range", function() {

    });

    it("Date ranges by default include start timestamp and exclude end timestamp", function() {

    });

  });

}

// impl ideas

interfaceSpec('backbone', {Collection: require('../backbone/CollectionImpl')});

interfaceSpec('pourover', {Collection: require('../pourover/CollectionImpl')});

//interfaceSpec('https://github.com/anthonyshort/backbone.collectionsubset or forks')
