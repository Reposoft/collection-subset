
module.exports = {

  Collection: require('./backbone/CollectionImpl'),

  // For migration from Backbone, resets API contract modifications from Collection
  CollectionB: require('./backbone/CollectionBImpl'),

  // Required because Backbone can't out of the box handle models coming from a different require (i.e. source file) than self
  // while such difference happens easily in an npm install where each lib has its own dependencies
  Backbone: require('./backbone/BackboneExport'),

  filters: require('./backbone/FiltersBackbone')

}
