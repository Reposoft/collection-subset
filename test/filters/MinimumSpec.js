
// the bare minimum of filter support

module.exports = function specGroup(required) {

  require('./WhereSpec.js')(required);

  require('./IdEnumSpec.js')(required);

};
