
var PourOver = require('./vendor/pourover');

var Filters = module.exports = {};

var supported = ['makeExactFilter', 'makeContinuousRangeFilter'];

for (var i = 0; i < supported.length; i++) {
  var name = supported[i];
  console.assert(!!PourOver[name], i);
  Filters[name] = PourOver[name];
}

Filters.where = function(properties) {
  var filter = [];
  for (var key in properties) {
    if (properties.hasOwnProperty(key)) {
      var clause = PourOver.makeExactFilter(key, [properties[key]]);
      filter.push(clause);
    }
  }
  return filter;
};
