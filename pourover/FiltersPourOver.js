
var PourOver = require('./vendor/pourover');

var Filters = module.exports = {};

var supported = ['makeExactFilter', 'makeContinuousRangeFilter'];

for (var i = 0; i < supported.length; i++) {
  var name = supported[i];
  console.assert(!!PourOver[name], i);
  Filters[name] = PourOver[name];
}
