
var expect = require('chai').expect;

var Filters = require('../').Filters;

describe("Filters", function() {

  it("Defines selected PourOver filters", function() {

    expect(Filters.hasOwnProperty('makeExactFilter')).to.be.true();
    expect(Filters.hasOwnProperty('makeContinuousRangeFilter')).to.be.true();

  });

  it("Has a date range filter", function() {
    // https://github.com/newslynx/pourover-example
  });

});
