// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    underscore: '../node_modules/underscore/underscore-min',
    backbone: '../node_modules/backbone/backbone-min',
    dust: '../node_modules/dustjs-linkedin/dist/dust-full.min',
    templates: '../templates'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});