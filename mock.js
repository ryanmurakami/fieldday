const path = require('path');
const ncp = require('ncp').ncp;

// setup default file to live file
const source = path.join(__dirname, 'data', 'default');
const destination = path.join(__dirname, 'data', 'modified');
ncp(source, destination, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Live file prepared');
});