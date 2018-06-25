
const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

process.env.NODE_ENV = 'development' //'production'
let io = require("socket.io");
let socketServer = io.listen(9999, {
    "log level": 1
});

//
require('./routes')(socketServer);


