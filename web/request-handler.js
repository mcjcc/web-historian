// requires we added in
var fs = require('fs');
var httpHelpers = require('./http-helpers');

// requires fred gave us
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var statusCode;
  // GET stuff here
  if (req.method === 'GET') {
    statusCode = 200;
    
    // what is read from fs.readFile gets stored into the html param of the callback function    
    fs.readFile(archive.paths.home, function(err, html) {
      if (err) { throw err; }    
      res.writeHead(statusCode, httpHelpers.headers);
      res.write(html);
      res.end();           
    });    
  }
  
  
  // res.end(archive.paths.home);
  // console.log(typeof archive.paths.home);
  // res.end(archive.paths.list);
  // res.end(httpHelpers.serveAssets(archive.paths.home));
};


// fs.readFile takes a file path and a callback as the parameters
// once the file is done being read, it calls back with the data



// test opens a file at that path and compares the contents in it