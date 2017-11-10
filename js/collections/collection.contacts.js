define(function(require) {
    
    var Backbone = require('backbone');
    var ContactModel = require('models/model.contact');
    var LocalStorage = require('localstorage');

    var ContactsCollection = Backbone.Collection.extend({
        model: ContactModel,
        localStorage: new Backbone.LocalStorage("Contacts"),

        search: function(letters) {
            var pattern = new RegExp(letters, "gi");
            return (this.filter(function(contact) {
                return pattern.test(contact.get("name"));
            }));
        }
    });

    return ContactsCollection;

});