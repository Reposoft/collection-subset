
// the bare minimum of filter support

module.exports = function specGroup(required) {

  require('./WhereSpec.js')(required);

  require('./EnumSpec.js')(required);

};
