define(function(require) {
    
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');

    var AppView = Backbone.View.extend({
        el: $('.main-container'),

        setCurrentView: function(view) {
            var closingView = this.view;

            this.view = view;
            this.view.render();
            this.view.$el.hide();
            this.$el.append(this.view.el);

            this.openView(this.view);
            this.closeView(closingView);
        },

        openView: function(view) {
            view.$el.slideToggle(500);
        },

        closeView: function(view) {
            if (!_.isUndefined(view)) {
                view.unbind();
                view.$el.slideToggle(500, function() {
                    $(this).remove();
                });
            }
        }

    });

    return AppView;

});