const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const io = require('socket.io');
const app = express();

process.env.NODE_ENV = 'development'; //'production'

app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('server listen on port 3000');
});

//enviar al router
require('./routes/serverRoutes')(app);