'use strict';

var expect = require('chai').expect;

var mocks = require('simple-mock');

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

    it("The ambiguity that Backbone offers isn't very useful, we'd prefer to have a type agnostic collection");
    it("We'd also prefer to avoid overuse of subclassing, and favor composition");

    it("Refuses to add objects that lack .attributes", function() {
      var c = new required.Collection();
      expect(function() {
        c.add({key: 'value', id: 'id1'});
      }).to.throw('Attributes property required, transfers state');
    });

    xit("Accepts any object with .attributes, not just Backbone.Model subclasses", function() {
      var obj = {
        attributes: {
          data1: 'val1'
        }
      };
      var c = new required.Collection();
      var added = c.add(obj);
      expect(obj.attributes.data1).to.equal('val1');
      expect(added.attributes.data1).to.equal('val1');
      expect(c == added).to.be.true();
    });

    it("Propagates change events from any object that emits them", function() {
      var bev = require('bev');
      var obj = {
        attributes: {
        }
      };
      bev.mixin(obj);
      var c = new required.Collection();
      var added = c.add(obj);
      var handler = mocks.spy(function() {});
      c.on('custom', handler);
      // workaround for issue #4
      bev.mixin(added);
      obj = added;
      // end workaround
      obj.trigger('custom');
      expect(handler.called).to.be.true();
    });

  });

  describe("Assorted asserts for compatibility with plain Backbone.Collection", function() {

    // below we compare with an actual backbone collection, useful for PourOver or other non-backbone impls

    var b = new Backbone.Collection();
    var c = new required.Collection();

    var bAdd = mocks.spy(function() {});
    b.on('add', bAdd);
    var cAdd = mocks.spy(function() {});
    c.on('add', cAdd);

    var m1 = new Backbone.Model({'id': 't1', 'name': 'Test1', 'date': new Date()});

    it("Accepts Backbone.Model instances", function() {
      b.add(m1);
      expect(m1.cid).to.exist();
      var added = c.add(m1);
      expect(added == m1).to.be.true();
    });

    it("Emits 'add' events", function() {
      expect(bAdd.calls).to.have.length(1);
      expect(cAdd.calls).to.have.length(1);
    });

    it("Emits change events", function() {
      var bc = mocks.spy(function() {});
      b.on('change:attr1', bc);
      var cc = mocks.spy(function() {});
      c.on('change:attr1', cc);
      m1.set('attr1',true);
      expect(bc.called).to.be.true();
      expect(cc.called).to.be.true();
    });

    it("Collection emits custom events from models", function() {
      var bCustom = mocks.spy(function() {});
      b.on('custom', bCustom);
      var cCustom = mocks.spy(function() {});
      c.on('custom', cCustom);
      m1.trigger('custom');
      expect(bCustom.called).to.be.true();
      expect(cCustom.called).to.be.true();
    });

  });

};
