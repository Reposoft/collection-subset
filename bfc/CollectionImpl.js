
var Collection = require('../backbone/CollectionImpl');

var subset = require('./SubsetWithFiltered');

module.exports = Collection.extend(subset);
