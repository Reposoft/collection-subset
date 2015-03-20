'use strict';

require('../backbone/test/BackboneSubsetMixinSpec');
require('../backbone/test/CollectionImplSpec');

require('../pourover/test/CollectionImplSpec');

require('../bfc/test/CollectionImplSpec');

var expect = require('chai').expect;

var exports = require('../');

describe("Module", function() {

  it("Exports Backbone.Model for use in downstream models to avoid the extra wrapping issue", function() {
    expect(exports.Backbone.Model).to.exist;
  });

  it("Exports Backbone.Collection alsongside Model so downstream logic doesn't need to import its own Backbone at all", function() {
    expect(exports.Backbone.Collection).to.exist;
  });

  it("Does not expose internal methods on this prototype", function() {
    expect(exports.Backbone.Collection.prototype.subsetConnect).to.be.undefined();
  });

});
