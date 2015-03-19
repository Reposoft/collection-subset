
// Make way for using https://github.com/Reposoft/bmc by only exporting the data structures

// No other code in this module should do the backbone require
var underscore = require('underscore');
var backbone = require('backbone');

module.exports = {
  Model: backbone.Model,
  Collection: backbone.Collection,
  _: underscore
}
