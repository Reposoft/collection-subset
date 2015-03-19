
var Backbone = require('../backbone/BackboneExport');

var subset = require('./SubsetWithFiltered');

module.exports = Backbone.Collection.extend(subset);
