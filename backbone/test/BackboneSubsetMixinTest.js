'use strict';

var expect = require('chai').expect;

var mocks = require('simple-mock');

describe("BackboneSubsetMixin", function() {

  var mixin = require('../BackboneSubsetMixin.js');

  // The mixin should work nicely on a prototype, i.e. not put any state there, but we're not asserting for that yet

  describe("#initialize", function() {

    it("Attaches superset options to the collection", function() {
      var opt = {
        superset: {},
        supersetMatcher: function() {},
        supersetImmerse: function() {}
      };
      mixin.apply({}).initialize.call(this, [], opt);
      expect(sub.superset).to.equal(opt.superset);
      expect(sub.supersetMatcher).to.equal(opt.supersetMatcher);
      expect(sub.supersetImmerse).to.equal(opt.supersetImmerse);
    });

    it("Pulls matching models to subset", function() {
      var sup = {
        filter: mocks.spy(function() {
          return [
            {attributes: {id: 't2'}},
            {attributes: {id: 't5'}}
          ]
        })
      };
      var sub = {
        initialize: mocks.spy(function() {})
      };
      mixin(sub);
      var matcher = function() {};
      sub.initialize([], {
        superset: sup,
        supersetMatcher: matcher
      });
      // ...
    });

  });

  describe("#add", function() {

    it("Adds to superset", function() {
      var sup = {
        add: mocks.spy(function() {})
      };
      var sub = {
        options: {
          superset: sup,
          supersetImmerse: mocks.spy(function() {})
        },
        add: mocks.spy(function() {})
      }
      mixin(sub);
      sub.add({attributes: {id: 't1'}});
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
