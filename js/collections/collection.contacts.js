define(function(require) {
    
    var Backbone = require('backbone');
    var ContactModel = require('models/model.contact');
    var _ = require('underscore');
    var LocalStorage = require('localstorage');

    var ContactsCollection = Backbone.Collection.extend({
        model: ContactModel,
        localStorage: new Backbone.LocalStorage("Contacts"),

        search: function(letters) {
            return _.filter(this.models, function(contact) {
                return contact.get("name").includes(letters);
            });
        }
    });

    return ContactsCollection;

});