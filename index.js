
module.exports = {

  Collection: require('./backbone/CollectionImpl'),

  // For migration from Backbone, resets API contract modifications from Collection
  CollectionB: require('./backbone/CollectionBImpl'),

  filters: require('./backbone/FiltersBackbone')

}
