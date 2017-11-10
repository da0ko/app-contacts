define(function(require) {
    var Backbone = require('backbone');
    var Router = require('router');
    var AppView = require('views/view.app');
    var ContactsCollection = require('collections/collection.contacts');

    var initialize = function() {
        var contactsCollections = new ContactsCollection();
        var appView = new AppView();
        App.router = new Router({
            view: appView,
            collection: contactsCollections
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
})