//Require serve-me package
var ServeMe = require('serve-me');

//*******************************
// HTTP SERVER
// Only server the html & other files
//*******************************
var port = 80;
var options = {
    home: "index.html",
    directory: "./src",
    debug: true,
    log: true,
    secure: false,
    cache: false
};

//Start the Server
ServeMe = ServeMe(options, port);

ServeMe.start();