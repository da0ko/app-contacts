// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  waitSeconds: 5,
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    underscore: '../node_modules/underscore/underscore-min',
    backbone: '../node_modules/backbone/backbone-min',
    dust: '../node_modules/dustjs-linkedin/dist/dust-full.min',
    localstorage: '../node_modules/backbone.localstorage/build/backbone.localStorage.min',
    templates: '../templates'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  window.App = {};
  App.initialize();
});