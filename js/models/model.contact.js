define(function(require) {
    var Backbone = require('backbone');
    var $ = require('jquery');
    var BackboneValidation = require('backboneValidaton');

    var ContactModel = Backbone.Model.extend({

        validation: {
            name: {
                required: true,
                msg: 'Please, enter a name'
            },
            phone: {
                fn: function(value, attr, computedState) {
                    var re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
                    if (!re.test(value)) {
                        return 'Phone number has wrong format';
                    }
                }
            },
            group: {
                required: true
            }
        }

    });

    return ContactModel;

});