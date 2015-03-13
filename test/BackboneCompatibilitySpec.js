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

  // This describe uses a regular Backbone Collection, not our backbone based impl,
  // so should be restricted to a few sample operations
  describe("Compatibility with plain Backbone.Collection", function() {

    var b = new Backbone.Collection();
    var c = new Collection();

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

    // TODO PourOver doesn't
    xit("Emits 'add' events", function() {
      expect(be.log).to.have.length(1);
      expect(ce.log).to.have.length(1);
    });

    it("Emits change events", function() {

    });

  });

};
