define([
  'backbone',
  'models/model.contact', 
  'localstorage'
], function(Backbone, ContactModel) {

  var ContactsCollection = Backbone.Collection.extend({
    model: ContactModel,
    localStorage: new Backbone.LocalStorage("Contacts"),

    search: function(letters) {
      var pattern = new RegExp(letters,"gi");
      return (this.filter(function(contact) {
          return pattern.test(contact.get("name"));
      }));
    }
  });

  return ContactsCollection;
});