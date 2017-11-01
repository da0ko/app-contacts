define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/model.contact.js',
  'js/views/view.contact.js'
], function($, _, Backbone, ContactModel, ContactsView) {

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'contacts/new': 'newContact',
      'contacts/edit/:id': 'editContact'
    },

    initialize: function(options) {
    },

    home: function() {
      var contactsModel = new ContactModel({
          name: 'testname',
          phone: '123',
          group: 'testgroup'
      })
      var contactsView = new ContactsView({
        model: contactsModel
      });
      contactsView.render();
        
      return contactsView;
    },

    newContact: function() {
      var createContactsView = new EditContactView({
        model: new ContactModel()
      });
      this.appView.setViews(createContactsView);

      createContactsView.on('form:submitted', function(attrs) {
        attrs.id = this.collection.isEmpty() ? 1 : (_.max(this.collection.pluck('id')) + 1);
        var newContact = new ContactModel(attrs);
        var modelError = newContact.isValid();
        if(modelError !== false) {
          this.collection.add(newContact);
          newContact.save();
          App.router.navigate('home', true);
        }
      }, this);

      createContactsView.on('form:close', this.contactFormClose);
    },
      
    contactFormClose: function() {
      App.router.navigate('home', true);
    }

  });

  return Router;
});