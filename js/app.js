define([
  'backbone',
  'router',
  'views/view.app',
  'collections/collection.contacts'
], function (Backbone, Router, AppView, ContactsCollection) {

  var initialize = function() {
    var contactsCollections = new ContactsCollection();  
    var appView = new AppView();  
    App.router = new Router({view: appView, collection: contactsCollections});
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});