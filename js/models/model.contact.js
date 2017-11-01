define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var ContactModel = Backbone.Model.extend({
      defaults: {
          name: '',
          phone: '00000000',
          group: 'none'
      }
  })
  
  ContactModel.validate = function(attrs) {
      if (!attrs.name) {
          return 'Name is required';
      }
  }

  return ContactModel;

});