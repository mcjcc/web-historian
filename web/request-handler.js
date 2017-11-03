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
  } else if (req.method === 'POST') {
    // for POST request: 
    statusCode = 201;
    // add it to site.txt if it's not there
    
    httpHelpers.collectData(req, function(url) {
      if (archive.isUrlInList(url, callback)) {
      }
      // if url is in list,
      //   if it's been archived
              // we show the page from archives/sites/....  
        // else show a loading type indicator
     // else 
          // add to list
      
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