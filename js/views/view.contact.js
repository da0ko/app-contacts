define(function(require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Dust = require('dust');
    var ContactTemplate = require('text!templates/template.contact.dust');

    var ContactView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-4 contact-wrapper',

        template: ContactTemplate,

        events: {
            'click .delete-contact': 'onClickContactDelete'
        },

        initialize: function() {
            this.listenTo(this.model, 'remove', this.remove)
        },

        render: function() {
            var compiled = dust.compile(this.template, "contactTemplate");
            dust.loadSource(compiled);
            var that = this;
            dust.render("contactTemplate", this.model.toJSON(), function(err, out) {
                if (err) {
                    console.log(err);
                }
                that.$el.html(out);
            });

            return this;
        },

        onClickContactDelete: function(e) {
            e.preventDefault();
            var confirmDelete = window.confirm('Do you want to delete the contact ?');
            if (confirmDelete) {
                this.model.destroy();
            }
        }
    });

    return ContactView;
});