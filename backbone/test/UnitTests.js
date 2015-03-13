'use strict';

var expect = require('chai').expect;

module.exports = function interfaceSpec(required) {

  describe("subsetConnect", function() {

    var sample1 = new required.Collection();
    sample1.add({id: 'id1', a:'X', b:5});
    sample1.add({id: 'id2', a:'Y', b:5});
    sample1.add({id: 'id3', a:'Y', b:7});

    it("Accepts arrays such as the result from .where", function() {
      expect(sample1.subsetConnect).to.be.a('function');
      var where = sample1.where({a:'Y'});
      expect(where).to.be.an('array');
      var subset = sample1.subsetConnect(where);
      expect(subset).to.exist;
      expect(subset.subsetConnect).to.be.a('function');
    });

  });

};
