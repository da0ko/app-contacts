define([
  'jquery',
  'underscore',
  'backbone',
  'models/model.contact',
  'views/view.contactlist',
  'views/view.contactedit'
], function($, _, Backbone, ContactModel, ContactlistView, EditContactView) {

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
    },
        

    home: function() {
      var contactlistView = new ContactlistView({
        collection: this.collection
      });
      this.appView.setViews(contactlistView);
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