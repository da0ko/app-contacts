define([
  'backbone',
  'router'
], function (Backbone, Router) {

  var initialize = function() {
    router = new Router();
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});