define(function(require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var ContactlistTemplate = require('text!templates/template.contactlist.dust');
    var ContactView = require('views/view.contact');
    
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
                that.$el.html(out);
            });

            this.contactsContainer = this.$('.contacts-container');
            this.emptyContactsPlaceholder = this.$('.empty-contacts-placeholder');
        },

        events: {
            'keyup .contact-name-search': 'searchContacts'
        },

        searchContacts: function(e) {
            var searchFilter = $.trim(this.$('.contact-name-search').val());
            if (searchFilter) {
               var filteredContacts = this.collection.search(searchFilter); 
               this.displaySearchResult(filteredContacts);
            } else {
                this.render();
            }
        },

        displaySearchResult: function(filteredContacts) {
            this.contactsContainer.empty();
            if (!_.isEmpty(filteredContacts)) {
                _.each(filteredContacts, this.renderContact, this);
            }       
        },
        
        render: function() {
            this.contactsContainer.empty();
            if (!this.collection.isEmpty()) {
                this.emptyContactsPlaceholder.hide();
                this.collection.each(this.renderContact, this);
            } else {
                this.emptyContactsPlaceholder.show();
            }
            return this;
        },

        renderContact: function(contact) {
            var contactView = new ContactView({
                model: contact
            });
            this.contactsContainer.append(contactView.render().$el);
        }
    });

    return ContactlistView;
});