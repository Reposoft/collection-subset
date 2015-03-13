'use strict';

var expect = require('chai').expect;

module.exports = function interfaceSpec(required) {

  var Collection = required.Collection;
  var filters = required.filters;

  // PourOver example, though array values may not be supported by some impls
  var monstersData = [{name: "sphinx", mythology: "greek", eyes: 2, sex: "f", hobbies: ["riddles","sitting","being a wonder"]},
                {name: "hydra", mythology: "greek", eyes: 18, sex: "m", hobbies: ["coiling","terrorizing","growing"]},
                {name: "huldra", mythology: "norse", eyes: 2, sex: "f", hobbies: ["luring","terrorizing"]},
                {name: "cyclops", mythology: "greek", eyes: 1, sex: "m", hobbies: ["staring","terrorizing"]},
                {name: "fenrir", mythology: "norse", eyes: 2, sex: "m", hobbies: ["growing","god-killing"]},
                {name: "medusa",  mythology: "greek", eyes: 2, sex: "f", hobbies: ["coiling","staring"]}];

  var Model = require('backbone').Model;
  var monsters = new Collection();
  for (var i = 0; i < monstersData.length; i++) {
    monsters.add(new Model(monstersData[i]));
  }

  monsters.pluck && console.log('monsters test data', monsters.pluck('name'));

  describe("filter:where", function() {

    it("Is at .filters.where", function() {
      expect(filters.where).to.exist;
      expect(filters.where).to.be.a('function');
    });

    xit("Is a basic exact single value match with an implied AND operator");
    xit("Is trivial to model in a query string");
    xit("Is trivial to model as a json filter, i.e. Underscore.js's #where");

    it("Takes a JSON object as definition", function() {
      expect(filters.where({k:'v'})).to.exist;
    });

    it("Refuses any non-primitive property values because those are not easily serializable", function() {

    });

    it("Requires at least one property", function() {

    });

    it("Can subset on a single key=value", function() {
      var filterNorse = filters.where({
        mythology: 'norse'
      });
      var subset = monsters.subset({filter: filterNorse});
      expect(subset.size()).to.equal(2);
      expect(subset.at(0).attributes.name).to.equal('huldra');
      expect(subset.at(1).attributes.name).to.equal('fenrir');
    });

  });

};
