'use strict';

require.config({

    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        dust: '../bower_components/dustjs-linkedin/dist/dust-full.min',
        backboneValidaton: '../bower_components/backbone.validation/dist/backbone-validation-amd',
        localstorage: '../node_modules/backbone.localstorage/build/backbone.localStorage',
        text: '../node_modules/text/text',
        templates: '../templates'
    }
});

require([
    'app',

], function(App) {
    window.App = {};
    App.initialize();
});