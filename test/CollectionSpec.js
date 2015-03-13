'use strict';

var expect = require('chai').expect;

var Backbone = require('backbone');

/**
 * Attempts to define a minimal API for Collections that back View+Controller logic.
 *
 * Also attempts to be more strict than Backbone so it can alert on suspicious use,
 * for example repeated add of a model.
 */
module.exports = function interfaceSpec(required) {

  var Collection = required.Collection;

  describe("Collection", function() {

    // A positive tests, with the more intricate details of these functions asserted in specific describe's below
    describe("#add, #length, #get, #remove", function() {

      var c = new Collection();

      // A zero-framework object constructor with the distinction between logic and persistable state
      var MyObj = function MyObj(attributes) {
        this.attributes = attributes;
      };

      var m1 = new MyObj({'id': 't1', 'name': 'Test 1', 'date': new Date()});
      m1.cid = 1;
      var m2 = new MyObj({'id': 't2', 'name': 'Test 2', 'date': new Date(m1.valueOf() + 1000)});

      it("Adds objects that have .attributes", function() {
        c.add(m1);
      });

      it("Has a size() method", function() {
        expect(c.size()).to.equal(1);
      });

      it("Adds arrays of objects that have .attributes", function() {
        c.add([m2]);
        expect(c.size()).to.equal(2);
      });

      xit("Does .cid stuff?", function() {
        // Backbone sets this on all model instances
      });

      // TODO What is a useful get behavior? getById, getByCid?

      xit("Retrieves objects by .cid if defined", function() {
        expect(c.get(1)).to.equal(m1);
      });

      xit("Retrieves objects by 'id' attribute values", function() {
        expect(c.get('t1')).to.equal(m1);
        expect(c.get('t2')).to.equal(m2);
      });

      xit("Removes by the same arguments as get", function() {
      });

      xit("Removes by instance?", function() {
        c.remove(m1);
        expect(c.size()).to.equal(1);
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

      // TODO how to handle duplicates

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

    describe("#add", function() {

      // The ambiguity that Backbone offers isn't very useful, we'd prefer to have a model class agnostic collection
      it("Refuses to add objects that lack .attributes", function() {

      });

      it("Refuses to add an object that has already been added", function() {

      });

      it("Should probably also refuse to add an object with a .attributes that has already been added", function() {

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

};
