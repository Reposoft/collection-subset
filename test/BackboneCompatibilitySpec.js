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

  it("Exports CollectionB, a less strict impl, to simplify migration from Backbone", function() {
    expect(required.CollectionB).to.exist;
  });

  describe("CollectionB laxer API", function() {

    it("Allows add with attribute hash instead of model", function() {
      var c = new required.CollectionB();
      var model = c.add({id: 'x', key:'val'});
      expect(model.attributes).to.exist;
    });

    it("Supports a model option for the conversion to models", function() {
      var MyModel = Backbone.Model.extend({my:function() {}});
      var MyCollection = required.CollectionB.extend({
        model: MyModel
      });
      var c = new MyCollection();
      var model = c.add({id: 'y'});
      expect(model.my).to.be.a('function');
    });

  });

  describe("Deliberate Backbone API violations", function() {

    // The ambiguity that Backbone offers isn't very useful, we'd prefer to have a model class agnostic collection
    // The ambiguity that Backbone offers isn't very useful, we'd prefer to have a type agnostic collection
    it("Refuses to add objects that lack .attributes", function() {
      var c = new required.Collection();
      expect(function() {
        c.add({key: 'value', id: 'id1'});
      }).to.throw('Attributes property required, transfers state');
    });

  });

  describe("Assorted asserts for compatibility with plain Backbone.Collection", function() {

    var b = new Backbone.Collection();
    var c = new required.Collection();

    var Listener = function(collection) {

      this.id = collection.toString();

      this.log = [];

      var eventHandler = function(event) {
        this.log.push(arguments);
        console.log('Compatible event?', this.id, JSON.stringify(event));
      };

      collection.on('add', eventHandler.bind(this));
    };

    var be = new Listener(b);
    var ce = new Listener(c);

    var m1 = new Backbone.Model({'id': 't1', 'name': 'Test1', 'date': new Date()});

    it("Accepts Backbone.Model instances", function() {
      b.add(m1);
      expect(m1.cid).to.exist();
      c.add(m1);
    });

    it("Emits 'add' events", function() {
      expect(be.log).to.have.length(1);
      expect(ce.log).to.have.length(1);
    });

    it("Emits change events", function() {

    });

  });

};
