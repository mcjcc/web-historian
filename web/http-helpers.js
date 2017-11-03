var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  // read in a response object, and asset, and callback

  // we open the asset with fs and output it to a variable
  // and then we store the variable inside the response object
  // and then return the response object
  var content = fs.readFile(asset);
  res.data = content;
  return res;
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};




// As you progress, keep thinking about what helper functions you can put here!

exports.collectData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    callback(data.toString()); // data is a url like www.google.com
  });
};
