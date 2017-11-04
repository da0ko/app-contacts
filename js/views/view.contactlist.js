define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/template.contactlist.dust',
  'views/view.contact'
], function($, _, Backbone, ContactlistTemplate, ContactView) {
    var ContactlistView = Backbone.View.extend({
    template: ContactlistTemplate,

    initialize: function() {
      this.listenTo(this.collection, 'remove', this.render);
        
      var compiled = dust.compile(this.template, "contactlistTemplate");
      dust.loadSource(compiled);
      var that = this;
      dust.render("contactlistTemplate", {}, function(err, out) {
          if (err) {
              console.log(err);
          }
          console.log("Rendered "+this);
          that.$el.html(out);
      });

      this.contactsContainer = this.$('.contacts-container');
      this.emptyContactsPlaceholder = this.$('.empty-contacts-placeholder');
      this.emptySearchPlaceholder = this.$('.empty-search-contacts-placeholder');
    },

    events: {
      'keyup .contact-name-search': 'searchContacts'
    },

    searchContacts: function(e) {
      var searchTerm = $.trim(this.$('.contact-name-search').val());
      if(searchTerm) {
        var filterd = this.collection.search(searchTerm);
        if(filterd.length) {
          this.contactsContainer.empty();
          this.emptySearchPlaceholder.empty();
          _.each(filterd, this.renderOne, this);
        } else {
          this.contactsContainer.empty();
          this.emptySearchPlaceholder.html('<div class="well text-center"><h3>There is no contacts starting with <strong>' + searchTerm + '.</strong></h3></div>');
        }
      } else {
        this.render();
      }
    },

    render: function() {
      this.contactsContainer.empty();
      if(this.collection.length) {
        this.collection.each(this.renderOne, this);
      } else {
        this.emptyContactsPlaceholder.html('<div class="well text-center"><h3>There is no contacts.</h3> <a href="#contacts/new" class="btn btn-lg btn-outline">Add Contact</a></div>');
      }

      return this;
    },

    renderOne: function(contact) {
      var contactView = new ContactView({model: contact});
      this.contactsContainer.append(contactView.render().$el);
    }
  });

  return ContactlistView;
});