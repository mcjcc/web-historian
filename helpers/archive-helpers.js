var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  home: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
// input
  // callback fn
// output
  // ??? it just reads it? it wraps all the fs.read code in a nice function i guess
// constraints
  // only reads from site.txt??
// edge cases
  // none come to mind, but it's pretty abstract so a lot of things could happen

// What this does:
  // open up sites.txt
  // Reads the file
  // Turns the text in the file into an array

  fs.readFile(this.paths.list, function(err, data) {
    if (err) { throw err; }    
    arrayData = data.toString().split('\n');
    callback(arrayData);
    
  });
};

exports.isUrlInList = function(url, callback) {
  // declare var to false
  var isFound = false;
  // invoke readListOfUrls to get an array of sites
  this.readListOfUrls(function(urls) {
  // invoke a forEach to iterate over the array
    urls.forEach(function(site) {
  // check to see if each URL is the one we're looking for
      if (site === url) {
    // if so, set var to true
        isFound = true;
      }
    });
    callback(isFound);
  });
  // callback(isFound);
  // callback(var);
  // callback(what variables does this take in?) before we can write the callback function itself
};

exports.addUrlToList = function(url, callback) {
  // add the url from the text input in the browser to site.txt
  // be a wrapper for all the fs.append
  // fs.appendFile(this.paths.list, url, callback(err));

  fs.appendFile(this.paths.list, url, (err) => {
    if (err) {
      throw err;
    }
    callback();
  });

  
};

// Done by second node server

exports.isUrlArchived = function(url, callback) {
  // go in to archives/sites folder 
  fs.readdir(this.paths.archivedSites, (err, files) => {
    // check if theres a file that matches the url input string  
    var isArchived = false;
    if (err) { throw err; }
    files.forEach(function(file) {
      if (file === url) {
        isArchived = true;
      }
    });
    callback(isArchived);  
  });
  
  
  // returns a boolean
};

exports.downloadUrls = function(urls) {
  //  input is an array of urls
  urls.forEach(function(url) {
    exports.isUrlArchived(url, function(exists) {
      if (!exists) {
        fs.writeFile(exports.paths.archivedSites + '/' + url, exports.getSource(url/*, callback */), function(err) {
          if (err) { throw err; }
        });
      }
    });    
  });
  
  //  output is a created file in the archives/sites folder
};

exports.getSource = function(url) {
  var options = {
    host: url,
    port: 80,
    path: '/index.html'
  };
  
  http.get(options, function(res) {
    console.log('Got response: ' + res);
    var rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => { var notRawData = rawData.toString(); });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
  // return stuff
};

// The user hits the submit button after typing a URL
// POST request gets initiated
// We compare the URL the user typed in with the list of URLs in sites.txt
// If the URL is not in the list, then add it to sites.txt


//scenarios:
  // 1. the website that the user types in is not on the sites.txt list
  // 2. the website that the user types in is on the sites.txt list, and has been downloaded
  // 3. the website that the user types in is on the sites.txt list, and has not been downloaded
