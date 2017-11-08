define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/template.contactedit.dust',
], function($, _, Backbone, ContactEditTemplate) {

  var EditContactView = Backbone.View.extend({
    template: ContactEditTemplate,

    initialize: function() {
        
      Backbone.Validation.bind(this);
      this.model.bind('validated:invalid', function(model, errors) {
            this.cleanFormErrors();    
            _.each(errors, this.showFormErrors, this);
      }, this);   
        
    },
      

    events: {
      'submit .contact-form': 'onFormSubmit',
      'click .btn-close-form': 'onFormClose'
    },

    render: function() {
        
      this.$el.empty();
        
      var compiled = dust.compile(this.template, "contactEditTemplate");
      dust.loadSource(compiled);
      var that = this;
      dust.render("contactEditTemplate", _.extend(this.model.toJSON(), {
        isNew: this.model.isNew()
      }), function(err, out) {
          if (err) {
              console.log(err);
          }
          that.$el.append(out);
      });

      return this;
    },

    onFormSubmit: function(e) { 
      var attrs = {
        name: this.$('.contact-name-input').val(),
        phone: this.$('.contact-phone-input').val(),
        group: this.$('.contact-group-input').val()
      };
     
      var hasErrors = this.model.validate(attrs);
      if (hasErrors) {
          return;
      }  
        
      this.trigger('form:submitted', attrs);
    },

    showFormErrors: function(error, fieldKey) {
      this.$('.form-group-' + fieldKey).addClass('has-error').find('.help-block').html(error);
    },

    cleanFormErrors: function() {
      this.$('.form-group').removeClass('has-error');
      this.$('.help-block').html('');
    },

    onFormClose: function(e) {
      e.preventDefault();
      this.trigger('form:close');
    }
  });

  return EditContactView;
});