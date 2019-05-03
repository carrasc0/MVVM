const db = require('../models/serverDB');
const fc = require('./serverFunctions');
const fcChat = require('./chatFunction');

//ssh-add ~/.ssh/id_rsa

module.exports = function (app) {

    //CHAT

    app.post('/getMessages', fcChat.getMessages);

    app.post('/getMoreMessages', fcChat.getMoreMessages);

    app.use(function (err, req, res, next) {
        console.error('ERROR: ' + err.stack);
        res.status(500).send('Something broke!');
    });

};