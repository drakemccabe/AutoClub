var fs = require('fs');
var path = require('path');

fs.readFile(path.resolve(__dirname, 'token'), 'utf8',function(err,content){
  process.env.NODE_JWT_TOKEN = content;
});

