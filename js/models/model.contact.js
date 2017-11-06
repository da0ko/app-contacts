define([
  'backbone',
  'jquery'
], function(Backbone, $) {

  var ContactModel = Backbone.Model.extend({
    defaults: {
      name: null,
      phone: null,
      group: null
    },
    
    validate: function (attrs) {
      var errors = [];
      if (!$.trim(attrs.name)) {
        errors.push({name: 'name', message: 'Please enter the name field.'});
      }
      if (!$.trim(attrs.phone) || !this.validatePhone(attrs.phone)) {
        errors.push({name: 'phone', message: 'Please, check phone that you\'ve entered'});
      }
      if (!$.trim(attrs.group)) {
        errors.push({name: 'group', message: 'Please enter the valid group field.'});
      }
      return errors.length > 0 ? errors : false;
    },

    validatePhone: function(name) { 
      var re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
      return re.test(name);
    }
      
  });

  return ContactModel;
});