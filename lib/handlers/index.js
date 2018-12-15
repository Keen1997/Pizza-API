/*
 * Request handlers
 *
 */

// Dependencies
var users = require('./users');
var tokens = require('./tokens');
var menus = require('./menus');
var carts = require('./carts');
var orders = require('./orders');

// Define the handlers
var handlers = {};

// Hello
handlers.hello = function(data,callback){
  callback(200, {'message' : 'Welcome!'});
};

// Users
handlers.users = function(data,callback){
  users(data,callback);
};

// Tokens
handlers.tokens = function(data,callback){
  tokens(data,callback);
};

// Menus
handlers.menus = function(data,callback){
  menus(data,callback);
};

// Carts
handlers.carts = function(data,callback){
  carts(data,callback);
};

// Payment
handlers.orders = function(data,callback){
  orders(data,callback);
};

//  Not found handlers
handlers.notFound = function(data,callback){
  callback(404);
};

// Export the module
module.exports = handlers;
