define(function(require) {

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var ContactModel = require('models/model.contact');
    var ContactListView = require('views/view.contactlist');
    var EditContactView = require('views/view.contactedit');
    var demoContacts = require('demo/demo.contacts');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'home': 'home',
            'contacts/new': 'newContact',
            'contacts/edit/:id': 'editContact'
        },

        initialize: function(options) {
            this.appView = options.view;
            this.collection = options.collection;
            this.collection.fetch();
            
            if (this.collection.isEmpty()) {
                this.initializeDemoData();
            }

        },


        home: function() {
            var contactListView = new ContactListView({
                collection: this.collection
            });

            this.appView.setCurrentView(contactListView);
        },

        newContact: function() {
            var createContactView = new EditContactView({
                model: new ContactModel()
            });
            this.appView.setCurrentView(createContactView);

            createContactView.on('form:submitted', function(attrs) {
                attrs.id = this.collection.isEmpty() ? 1 : (_.max(this.collection.pluck('id')) + 1);
                var newContact = new ContactModel(attrs);
                this.collection.add(newContact);
                newContact.save();
                App.router.navigate('home', true);
            }, this);

            createContactView.on('form:close', this.closeContactForm);
        },

        editContact: function(id) {
            var contact = this.collection.get(id);
            var editContactsView = new EditContactView({
                model: contact
            });
            this.appView.setCurrentView(editContactsView);

            editContactsView.on('form:submitted', function(attrs) {
                contact.save(attrs);
                App.router.navigate('home', true);
            });

            editContactsView.on('form:close', this.closeContactForm);
        },

        closeContactForm: function() {
            App.router.navigate('home', true);
        },
        
        initializeDemoData: function() {
            _.each(demoContacts, function(demoContact) {
                this.collection.add(demoContact);
                demoContact.save();
            }, this);
        }  

    });

    return Router;
});