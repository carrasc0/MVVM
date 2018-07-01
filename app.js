const utils = require('./utils/utils');
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io');

const morgan = require('morgan');
const bodyParser = require('body-parser');


process.env.NODE_ENV = 'development'; //'production'

app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('server listen on port 3000');
});

const socketServer = io.listen(8000, () => {
    console.log('serverSocket listen on port 8000');
});

//enviar al router update
require('./routes/serverRoutes')(app);
require('./routes/chatRoutes')(socketServer);

console.log(utils.getBoundaries('4.6665578', '-74.0524521', 2));