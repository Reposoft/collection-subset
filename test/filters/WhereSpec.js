'use strict';

var expect = require('chai').expect;

module.exports = function interfaceSpec(required) {

  var Collection = required.Collection;
  var collection = new Collection();

  describe("filter:where", function() {

    it("Is at .filters.where", function() {
      console.log('f', collection.filters);
      expect(collection.filters.where).to.exist;
      expect(collection.filters.where).to.be.a('function');
    });

    xit("Is a basic exact single value match with an implied AND operator");
    xit("Is trivial to model in a query string");
    xit("Is trivial to model as a json filter, i.e. Underscore.js's #where");

    it("Takes a json object as definition", function() {

    });

    it("Refuses any non-primitive property values because those are not easily serializable", function() {

    });

    it("Requires at least one property", function() {

    });

  });

};
