define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/template.contactedit.dust',
], function($, _, Backbone, ContactEditTemplate) {

  var EditContactView = Backbone.View.extend({
    template: ContactEditTemplate,

    initialize: function() {
      this.listenTo(this.model, 'invalid', function(model, error, options) {
        this.cleanFormErrors();
        _.each(error, this.showFormErrors, this);
      });
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
          console.log("Rendered "+this);
          that.$el.append(out);
      });

      return this;
    },

    onFormSubmit: function(e) {
      e.preventDefault();
      var attrs = {
        name: this.$('.contact-name-input').val(),
        phone: this.$('.contact-phone-input').val(),
        group: this.$('.contact-email-input').val()
      };

      if(this.model.isNew()) {
        var error = this.model.validate(attrs);
        if(error) {
          this.cleanFormErrors();
          _.each(error, this.showFormErrors, this);
          return;
        }
      }

      this.trigger('form:submitted', attrs);
    },

    showFormErrors: function(error) {
      this.$('.form-group-' + error.name).addClass('has-error').find('.help-block').html(error.message);
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