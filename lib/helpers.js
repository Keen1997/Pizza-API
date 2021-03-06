/*
 * Helpers for various task
 *
 */

 // Dependencies
var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');

// Contain for all the helpers
var helpers = {};


// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  }catch(e){
    return {};
  }
};

// Create a string of random alphanumaric characters, of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++){
      // Get the random character from the possibleCharacters string
      var ramdomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
      // Append this character to the final string
      str+=ramdomCharacter;
    }

    // Return the final string
    return str;

  } else {
    return false;
  }
};

// Check a email is valid format or not
helpers.validateEmail = function(email) {
  var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailFormat.test(String(email).toLowerCase());
}

// Payment by stripe API
helpers.stripe = function(amount,currency,description,source,callback){
  // Configure the request payload
  var payload = {
    'amount' : amount,
    'currency' : currency,
    'description' : description,
    'source' : source,
  }

  // Stringify the payload
  var stringPayload = querystring.stringify(payload);

  // Configure the request details
  var requestDetails = {
    'protocol' : 'https:',
    'hostname' : 'api.stripe.com',
    'method' : 'POST',
    'auth' : config.stripe.secretKey,
    'path' : '/v1/charges',
    'headers' : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : Buffer.byteLength(stringPayload)
    }
  }

  // Instantiate the request object
  var req = https.request(requestDetails,function(res){
    // Grab the status of the sent request
    var status = res.statusCode;
    // Callback successfully if the request went through
    if(status==200 || status==201){
      callback(false);
    } else {
      callback('Status code return was '+status);
    }
  });

  // Bind to the error event so it doesn't get the thrown
  req.on('error',function(e){
    callback(e);
  });

  // Add the payload
  req.write(stringPayload);

  // End the request
  req.end();
}

// Send the email by mailgun API
helpers.mailgun = function(to,subject,text,callback){
  // Configure the request payload
  var payload = {
    'from' : config.mailgun.sender,
    'to' : to,
    'subject' : subject,
    'text' : text
  }

  // Stringify the payload
  var stringPayload = querystring.stringify(payload);

  // Configure the request details
  var requestDetails = {
    'protocol' : 'https:',
    'hostname' : 'api.mailgun.net',
    'method' : 'POST',
    'auth' : config.mailgun.apiKey,
    'path' : '/v3/'+config.mailgun.domainName+'/messages',
    'headers' : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : Buffer.byteLength(stringPayload)
    }
  }

  // Instantiate the request object
  var req = https.request(requestDetails,function(res){
    // Grab the status of the sent request
    var status = res.statusCode;
    // Callback successfully if the request went through
    if(status==200 || status==201){
      callback(false);
    } else {
      callback('Status code return was '+status);
    }
  });

  // Bind to the error event so it doesn't get the thrown
  req.on('error',function(e){
    callback(e);
  });

  // Add the payload
  req.write(stringPayload);

  // End the request
  req.end();
}

// Export the module
module.exports = helpers;
