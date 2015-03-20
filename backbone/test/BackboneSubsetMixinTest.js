'use strict';

var expect = require('chai').expect;

var mocks = require('simple-mock');

describe("BackboneSubsetMixin", function() {

  var mixin = require('../BackboneSubsetMixin.js');
  // establish a convention for these tests
  delete mixin.call;

  // The mixin should work nicely on a prototype, i.e. not put any state there, but we're not asserting for that yet

  describe("Mixin characteristics", function() {

    it("Can be applied to an empty object for unit testing", function() {
      mixin.apply({});
    });

    it("Returns its this", function() {
      var o = {};
      expect(mixin.apply(o)).to.equal(o);
    });

    it("Function invocations decide if the context meets dependencies", function() {
      expect(function() {
        var o = mixin.apply(o);
        o.initialize.call(o);
      }).to.throw('Missing super.initialize');
    });

  });

  describe("#initialize", function() {

    it("Runs super initialize", function() {
      var initialize = mocks.spy();
      var b = mixin.apply({initialize: initialize});
      expect(b.initialize).to.not.equal(initialize);
      b.initialize.call(b);
      expect(initialize.called).to.be.true();
    });

    it("Attaches superset options to the collection", function() {
      var options = {
        subset: {
          from: {
            filter: function f() {}
          },
          matcher: function m() {},
          immerse: function i() {}
        }
      };
      var b = mixin.apply({ initialize: function() {} });
      b.initialize.call(b, [], options);
      expect(b.subset).to.exist();
      expect(b.subset.from).to.equal(options.subset.from);
      expect(b.subset.matcher).to.equal(options.subset.matcher);
      expect(b.subset.immerse).to.equal(options.subset.immerse);
    });

    it("Immerse defaults to noop function", function() {
      var subset = {
        from: {
          filter: function f() {}
        },
        matcher: function m() {}
      };
      var b = mixin.apply({ initialize: function() {} });
      b.initialize.call(b, [], {subset: subset});
      expect(b.subset.immerse).to.exist();
      b.subset.immerse.call(b);
    });

    it("Calls .pull if subset options is set", function() {
      var pull = mocks.spy();
      mixin.apply({
        initialize: function() {}
      }).initialize.call({
          subset: {
            pull: pull
          }
        }, [], {
          subset: {
            from: {},
            matcher: function m() {}
          }
        }
      );
      expect(pull.called).to.be.true();
    });

  });

  describe("#pull", function() {

    it("Pulls matching models to subset", function() {
      var b = mixin.apply({
        initialize: function() {}
      });
      b.subset.from = {
        filter: mocks.spy(function() {
          return [
            {attributes: {id: 't2'}},
            {attributes: {id: 't5'}}
          ]
        })
      };
      b.subset.matcher = function m() {};
      b.add = mocks.spy();
      b.subset.pull.call(b);
      expect(b.subset.from.filter.called).to.be.true();
      expect(b.subset.from.filter.calls[0].args[0]).to.equal(b.subset.matcher);
      expect(b.add.called).to.be.true();
      expect(b.add.calls[0].args[0]).to.have.length(2);
      expect(b.add.calls[0].args[0][1].attributes.id).to.equal('t5');
    });

  });


  describe("#add", function() {

    it("Calls overridden add", function() {

    });

    it("Runs immerse on single model", function() {

    });

    it("Runs immerse on each model if an array is passed", function() {

    });

    it("Also adds to super", function() {

    });

  });

  describe("Assumptions about Backbone behavior", function() {

    var Backbone = require('../BackboneExport');

    it("Exposes attached options", function() {
      var c = new Backbone.Collection([], {comparator: false});
      expect(c.comparator).to.be.false();
    });

  });


});
