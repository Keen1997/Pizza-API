/*
 * Primary file for the API
 *
 */

// Dependencies
var server = require('./lib/server');

// Declare the app
var app = {};

app.init = function(){
  // Start the server
  server.init();

};

// Execute the function
app.init();

// Export the app
module.exports = app;
