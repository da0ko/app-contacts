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
      if (!$.trim(attrs.name) || !this.validateName(attrs.name)) {
        errors.push({name: 'name', message: 'Please enter the name field.'});
      }
      if (!$.trim(attrs.phone)) {
        errors.push({name: 'phone', message: 'Please enter the phone field.'});
      }
      if (!$.trim(attrs.group)) {
        errors.push({name: 'group', message: 'Please enter the valid group field.'});
      }
      return errors.length > 0 ? errors : false;
    },

    validateName: function(name) { 
    //  var re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
//      return re.test(name);
        return true;
    }
      
  });

  return ContactModel;
});