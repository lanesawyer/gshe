var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var base = path.join(process.cwd(), process.argv[2] || '');
var port = process.argv[3] || 8888;

var extensionRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
var contentTypeMap = {
  html: 'text/html',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpeg'
};

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname;
  var filename = path.join(base, uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      // instead of a 404, redirect to hash version and angular will take care of the rest
      var hashVersion = '/#' + uri;
      console.log('could not find:', filename, ' --- ', 'redirecting to:', hashVersion);
      response.writeHead(302, { Location: hashVersion });
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename = path.join(filename, '/index.html');
    }

    fs.readFile(filename, 'binary', function(err, file) {
      if(err) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(err + '\n');
        response.end();
        return;
      }
      var extension = filename.match(extensionRegex)[1];

      response.writeHead(200, {'Content-Type': contentTypeMap[extension] || 'text/plain'});
      response.write(file, 'binary');
      response.end();
    });
  });
}).listen(parseInt(port, 10));