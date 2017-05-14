var secureRandom = require('secure-random'),
    path = require('path'),
    fs = require('fs');

fs.writeFileSync(path.resolve(__dirname, '../../config/initializers/token'), secureRandom(256, {type: 'Buffer'}).toString('base64'), 'utf8');
