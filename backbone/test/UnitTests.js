'use strict';

var expect = require('chai').expect;

var mocks = require('simple-mock');

var Backbone = require('../BackboneExport');

module.exports = function interfaceSpec(required) {

  describe("Collection initialize with subset definition options", function() {

    it("Passes add and remove to superset", function() {
      var matcher = mocks.spy(function() { return true; });
      var immerse = mocks.spy(function(model) { model.set('immersed', true); });
      var master = {
        filter: mocks.spy(function() {
          return [
            new Backbone.Model({id: 't1'})
          ]
        }),
        add: mocks.spy(function() {

        }),
        remove: mocks.spy(function() {

        })
      };
      var subset = new required.Collection([], {
        superset: master,
        supersetMatcher: matcher,
        supersetImmerse: immerse
      });
      expect(master.filter.calls).to.have.length(1);


    });

  });

};
